export type BikeType = 'City' | 'Road' | 'Mountain' | 'Electric' | 'Cargo' | 'Kids';

export interface Bike {
  id: string;
  name: string;
  type: BikeType;
  color: string;
  hourly: number;
  daily: number;
  sizes: string[];
  rating: number;
  reviews: number;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const BIKES: Bike[] = [
  {
    id: 'harbor-cruiser',
    name: 'Harbor Cruiser',
    type: 'City',
    color: '#2f7fbf',
    hourly: 6,
    daily: 24,
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviews: 212,
    summary: 'Upright, comfy and easy — the classic way to see the waterfront.',
    description:
      'A relaxed step-through frame with a wide saddle, front basket and 3-speed hub. Ideal for flat city loops, the harbor path and café stops.',
    specs: [
      { label: 'Gears', value: '3-speed internal hub' },
      { label: 'Brakes', value: 'Coaster + front rim' },
      { label: 'Weight', value: '17 kg' },
      { label: 'Includes', value: 'Basket, bell, lights' },
    ],
  },
  {
    id: 'velo-sprint',
    name: 'Velo Sprint',
    type: 'Road',
    color: '#c0392b',
    hourly: 9,
    daily: 38,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviews: 97,
    summary: 'Light aluminium road bike for coastal rides and hill repeats.',
    description:
      'Endurance geometry, 22 speeds and carbon fork. Pedals are flat by default; bring your own clipless pedals and we will fit them for free.',
    specs: [
      { label: 'Gears', value: '2×11 Shimano 105' },
      { label: 'Brakes', value: 'Hydraulic disc' },
      { label: 'Weight', value: '8.9 kg' },
      { label: 'Includes', value: 'Bottle cage, saddle bag' },
    ],
  },
  {
    id: 'ridgeback-trail',
    name: 'Ridgeback Trail',
    type: 'Mountain',
    color: '#d68910',
    hourly: 10,
    daily: 42,
    sizes: ['M', 'L', 'XL'],
    rating: 4.6,
    reviews: 154,
    summary: 'Full-suspension trail bike for the Pine Hollow singletrack.',
    description:
      '130 mm travel front and rear, dropper post and tubeless tyres. Our staff will set sag for your weight at pickup.',
    specs: [
      { label: 'Suspension', value: '130 mm / 130 mm' },
      { label: 'Brakes', value: '4-piston hydraulic disc' },
      { label: 'Weight', value: '14.2 kg' },
      { label: 'Includes', value: 'Trail map, repair kit' },
    ],
  },
  {
    id: 'volt-commuter',
    name: 'Volt Commuter',
    type: 'Electric',
    color: '#16a085',
    hourly: 12,
    daily: 49,
    sizes: ['M', 'L'],
    rating: 4.9,
    reviews: 301,
    summary: 'Pedal-assist e-bike with 80 km range. Hills? What hills.',
    description:
      'Mid-drive motor, 500 Wh battery and integrated lights. Fully charged at pickup; charger included for multi-day rentals.',
    specs: [
      { label: 'Range', value: 'Up to 80 km' },
      { label: 'Assist', value: '25 km/h, 4 levels' },
      { label: 'Weight', value: '23 kg' },
      { label: 'Includes', value: 'Charger, lock, panniers' },
    ],
  },
  {
    id: 'packmule-cargo',
    name: 'Packmule Cargo',
    type: 'Cargo',
    color: '#7d3c98',
    hourly: 14,
    daily: 55,
    sizes: ['One size'],
    rating: 4.5,
    reviews: 48,
    summary: 'Electric longtail that carries two kids or a week of groceries.',
    description:
      'Rated to 200 kg total load, with running boards, a padded rear bench and rain cover. Quick-adjust seatpost fits riders 155–195 cm.',
    specs: [
      { label: 'Load', value: '200 kg max' },
      { label: 'Assist', value: '25 km/h, 5 levels' },
      { label: 'Weight', value: '34 kg' },
      { label: 'Includes', value: 'Rain cover, 2 kid seats' },
    ],
  },
  {
    id: 'sprout-20',
    name: 'Sprout 20″',
    type: 'Kids',
    color: '#27ae60',
    hourly: 4,
    daily: 15,
    sizes: ['20″'],
    rating: 4.8,
    reviews: 66,
    summary: 'A lightweight 20-inch bike for young riders, ages 6–10.',
    description:
      'Fits riders roughly 115–135 cm tall. Low standover height, short-reach brake levers and a 6-speed twist shifter. Kids’ helmet included free.',
    specs: [
      { label: 'Rider height', value: '115–135 cm' },
      { label: 'Gears', value: '6-speed twist shifter' },
      { label: 'Weight', value: '9.5 kg' },
      { label: 'Includes', value: 'Kids’ helmet, bell' },
    ],
  },
  {
    id: 'foldaway-mini',
    name: 'Foldaway Mini',
    type: 'City',
    color: '#566573',
    hourly: 5,
    daily: 20,
    sizes: ['One size'],
    rating: 4.3,
    reviews: 83,
    summary: 'Folds in 10 seconds. Take it on the tram, the ferry, the hotel lift.',
    description:
      'A 16-inch folding bike with 6 speeds and a carry bag. Perfect if your day mixes riding with public transport.',
    specs: [
      { label: 'Folded size', value: '58 × 56 × 27 cm' },
      { label: 'Gears', value: '6-speed' },
      { label: 'Weight', value: '11.8 kg' },
      { label: 'Includes', value: 'Carry bag' },
    ],
  },
  {
    id: 'gravel-roamer',
    name: 'Gravel Roamer',
    type: 'Road',
    color: '#a04000',
    hourly: 9,
    daily: 36,
    sizes: ['S', 'M', 'L'],
    rating: 4.7,
    reviews: 59,
    summary: 'Wide tyres and relaxed geometry for gravel roads and long days.',
    description:
      '40 mm tyres, 1×11 drivetrain and frame bag mounts. Equally at home on the canal towpath and the forest fire roads.',
    specs: [
      { label: 'Tyres', value: '700 × 40c' },
      { label: 'Gears', value: '1×11' },
      { label: 'Weight', value: '10.1 kg' },
      { label: 'Includes', value: 'Frame bag, pump' },
    ],
  },
];

export const LOCATIONS = [
  { id: 'harbor', name: 'Harbor Station — 12 Quay Street' },
  { id: 'central', name: 'Central Square — 4 Market Lane' },
  { id: 'pine', name: 'Pine Hollow Trailhead — Car park B' },
];

export const EXTRAS = [
  { id: 'helmet', name: 'Helmet', perDay: 3 },
  { id: 'lock', name: 'D-lock', perDay: 2 },
  { id: 'childSeat', name: 'Child seat', perDay: 5 },
] as const;

export type ExtraId = (typeof EXTRAS)[number]['id'];

export const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

export function getBike(id: string | undefined) {
  return BIKES.find((b) => b.id === id);
}

export function bikeImage(color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200'><rect width='320' height='200' fill='#eef3f1'/><g fill='none' stroke='#1d2b28' stroke-width='7'><circle cx='88' cy='132' r='44'/><circle cx='232' cy='132' r='44'/></g><g fill='none' stroke='${color}' stroke-width='9' stroke-linecap='round' stroke-linejoin='round'><path d='M88 132 L140 70 L212 70 L232 132 M140 70 L168 132 L212 70 M168 132 L88 132'/><path d='M134 56 L156 56 M212 70 L206 48 L226 44'/></g><circle cx='168' cy='132' r='8' fill='#1d2b28'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}
