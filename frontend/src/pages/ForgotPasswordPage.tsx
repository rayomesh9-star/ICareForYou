import React, { useState } from 'react';
import { theme } from '../ui/theme';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Backend reset flow not implemented yet end-to-end in this project.
    // This page is UI-ready; hook it to your future endpoint when you add reset tokens.
    await new Promise((r) => setTimeout(r, 600));

    setMessage('If the email exists, a reset link will be sent.');
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
          Reset password
        </div>
        <div style={{ color: theme.muted, fontSize: 13, marginTop: 6 }}>
          Enter your email and we’ll send a reset link.
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
          <label style={{ fontSize: 13, color: theme.text, fontWeight: 700 }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="icare-input"
            type="email"
            placeholder="name@example.com"
            required
          />

          {message ? (
            <div style={{ marginTop: 12, color: theme.brand, fontWeight: 800 }}>
              {message}
            </div>
          ) : null}

          <button type="submit" disabled={loading} style={buttonStyle} className="icare-button">
            {loading ? 'Sending...' : 'Send reset link'}
          </button>

          <div style={{ marginTop: 10, fontSize: 12, color: theme.muted }}>
            <a href="/login" style={{ color: theme.brand, fontWeight: 800 }} className="icare-link">
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

// inputStyle removed (using .icare-input from src/styles/form.css)

const buttonStyle: React.CSSProperties = {
  marginTop: 16,
  width: '100%',
  background: theme.brand,
  color: '#052e16',
  border: `1px solid rgba(34,197,94,0.45)`,
  borderRadius: 12,
  padding: '10px 12px',
  fontWeight: 900,
  cursor: 'pointer',
  boxSizing: 'border-box',
  transition: 'transform 80ms ease, filter 140ms ease, box-shadow 140ms ease',
  boxShadow: '0 0 0 rgba(34,197,94,0)',
};


