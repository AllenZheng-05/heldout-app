import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { EXTRAS, getBike, type ExtraId } from './data';

export interface Rider {
  name: string;
  email: string;
  phone: string;
  height: string;
}

export interface Draft {
  bikeId: string;
  size: string;
  location: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  rider: Rider;
  extras: Record<ExtraId, number>;
}

export interface Booking extends Draft {
  id: string;
  createdAt: string;
  total: number;
  status: 'upcoming' | 'cancelled';
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  homeLocation: string;
  emailReminders: boolean;
  smsReminders: boolean;
  newsletter: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  phone: '',
  homeLocation: 'harbor',
  emailReminders: true,
  smsReminders: false,
  newsletter: false,
};

interface Store {
  profile: Profile;
  setProfile: (p: Profile) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  draft: Draft | null;
  startDraft: (bikeId: string, size: string) => void;
  updateDraft: (patch: Partial<Draft>) => void;
  bookings: Booking[];
  placeBooking: () => Booking | null;
  cancelBooking: (id: string) => void;
  deleteAccount: () => void;
}

const Ctx = createContext<Store | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory only */
  }
}

export function rentalDays(d: Pick<Draft, 'pickupDate' | 'returnDate'>) {
  if (!d.pickupDate || !d.returnDate) return 0;
  const ms = new Date(d.returnDate).getTime() - new Date(d.pickupDate).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

export function priceOf(d: Draft) {
  const bike = getBike(d.bikeId);
  const days = rentalDays(d);
  if (!bike) return { days, base: 0, extras: 0, total: 0 };
  const base = bike.daily * days;
  const extras = EXTRAS.reduce((sum, e) => sum + e.perDay * (d.extras[e.id] || 0) * days, 0);
  return { days, base, extras, total: base + extras };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(() => load('ll.profile', DEFAULT_PROFILE));
  const [favorites, setFavorites] = useState<string[]>(() => load('ll.favorites', []));
  const [bookings, setBookings] = useState<Booking[]>(() => load('ll.bookings', []));
  const [draft, setDraft] = useState<Draft | null>(() => load('ll.draft', null));

  useEffect(() => save('ll.profile', profile), [profile]);
  useEffect(() => save('ll.favorites', favorites), [favorites]);
  useEffect(() => save('ll.bookings', bookings), [bookings]);
  useEffect(() => save('ll.draft', draft), [draft]);

  const store: Store = {
    profile,
    setProfile: setProfileState,
    favorites,
    toggleFavorite: (id) =>
      setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    draft,
    startDraft: (bikeId, size) =>
      setDraft({
        bikeId,
        size,
        location: profile.homeLocation,
        pickupDate: '',
        pickupTime: '10:00',
        returnDate: '',
        returnTime: '17:00',
        rider: { name: profile.name, email: profile.email, phone: profile.phone, height: '' },
        extras: { helmet: 0, lock: 0, childSeat: 0 },
      }),
    updateDraft: (patch) => setDraft((d) => (d ? { ...d, ...patch } : d)),
    bookings,
    placeBooking: () => {
      if (!draft) return null;
      const booking: Booking = {
        ...draft,
        id: 'LL-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        createdAt: new Date().toISOString(),
        total: priceOf(draft).total,
        status: 'upcoming',
      };
      setBookings((b) => [booking, ...b]);
      return booking;
    },
    cancelBooking: (id) =>
      setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: 'cancelled' } : x))),
    deleteAccount: () => {
      setProfileState(DEFAULT_PROFILE);
      setFavorites([]);
      setBookings([]);
      setDraft(null);
    },
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside provider');
  return s;
}
