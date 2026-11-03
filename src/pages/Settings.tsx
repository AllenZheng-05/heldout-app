import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCATIONS } from '../data';
import { useStore, type Profile } from '../store';

export default function Settings() {
  const { profile, setProfile, deleteAccount } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState<Profile>(profile);
  const [confirmText, setConfirmText] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setForm({ ...form, [k]: v });

  const save = (e: FormEvent) => {
    e.preventDefault();
    setProfile(form);
  };

  return (
    <>
      <h1>Settings</h1>
      <form className="panel form settings" onSubmit={save} data-testid="settings-form">
        <h2 className="h3">Profile</h2>
        <div className="field">
          <label htmlFor="s-name">Name</label>
          <input id="s-name" className="input" value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="row">
          <div className="field">
            <label htmlFor="s-email">Email</label>
            <input
              id="s-email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="s-phone">Phone</label>
            <input
              id="s-phone"
              type="tel"
              className="input"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="s-home">Usual pickup station</label>
          <select
            id="s-home"
            className="input"
            value={form.homeLocation}
            onChange={(e) => set('homeLocation', e.target.value)}
          >
            {LOCATIONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          <p className="hint">We’ll pre-select this station when you book.</p>
        </div>

        <fieldset className="toggles">
          <legend>Notifications</legend>
          <label className="check">
            <input
              type="checkbox"
              checked={form.emailReminders}
              onChange={(e) => set('emailReminders', e.target.checked)}
            />
            Email me a reminder the day before pickup
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.smsReminders}
              onChange={(e) => set('smsReminders', e.target.checked)}
            />
            Text me when my bike is ready
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={form.newsletter}
              onChange={(e) => set('newsletter', e.target.checked)}
            />
            Monthly newsletter with routes and offers
          </label>
        </fieldset>

        <div className="actions">
          <button type="submit" className="btn btn-primary" data-testid="settings-save">
            Save changes
          </button>
        </div>
      </form>

      <section className="panel danger-zone" aria-labelledby="dz-title">
        <h2 id="dz-title" className="h3">
          Delete account
        </h2>
        <p>This removes your profile, saved bikes and rental history from this device.</p>
        {!showDelete ? (
          <button className="link-danger" onClick={() => setShowDelete(true)} data-testid="delete-account">
            Delete my account…
          </button>
        ) : (
          <div className="delete-confirm">
            <label htmlFor="confirm-delete">
              Type <strong>DELETE</strong> to confirm
            </label>
            <input
              id="confirm-delete"
              className="input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              data-testid="delete-confirm-input"
            />
            <div className="actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowDelete(false);
                  setConfirmText('');
                }}
              >
                Keep my account
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={confirmText !== 'DELETE'}
                onClick={() => {
                  deleteAccount();
                  navigate('/');
                }}
                data-testid="delete-confirm-button"
              >
                Permanently delete
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
