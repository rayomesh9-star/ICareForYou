import React, { useState } from 'react';
import { theme } from '../ui/theme';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // UI placeholder: wire to backend when reset endpoints are added.
    await new Promise((r) => setTimeout(r, 700));
    setMessage('Password reset successful. You can login now.');
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        display: 'grid',
        placeItems: 'center',
        padding: 18,
        fontFamily: 'system-ui',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: 22,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ fontWeight: 900, color: theme.text, fontSize: 18 }}>
          Choose new password
        </div>
        <div style={{ color: theme.muted, fontSize: 13, marginTop: 6 }}>
          Set a strong password for your account.
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
          <label style={{ fontSize: 13, color: theme.text, fontWeight: 700 }}>
            New password
          </label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
            type="password"
            placeholder="••••••••"
            required
          />

          {message ? (
            <div style={{ marginTop: 12, color: theme.brand, fontWeight: 800 }}>
              {message}
            </div>
          ) : null}

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 6,
  padding: '10px 12px',
  borderRadius: 12,
  border: '1px solid #e5e7eb',
  outline: 'none',
  fontSize: 14,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 16,
  width: '100%',
  background: '#22c55e',
  color: '#052e16',
  border: '1px solid rgba(34,197,94,0.45)',
  borderRadius: 12,
  padding: '10px 12px',
  fontWeight: 900,
  cursor: 'pointer',
};

