import React, { useState } from 'react';
import { login } from '../services/auth';
import { theme } from '../ui/theme';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });

      window.location.href = '/';
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
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
          maxWidth: 420,
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: 22,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: theme.brandSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.brand,
              fontWeight: 900,
            }}
          >
            i
          </div>
          <div>
            <div style={{ fontWeight: 900, color: theme.text, fontSize: 18 }}>
              IcareForYou
            </div>
            <div style={{ color: theme.muted, fontSize: 13 }}>
              Hospital Management System
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
          <label style={{ fontSize: 13, color: theme.text, fontWeight: 700 }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="name@example.com"
            type="email"
            required
          />


          <div style={{ height: 12 }} />

          <label style={{ fontSize: 13, color: theme.text, fontWeight: 700 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
            required
          />

          {error ? (
            <div style={{ marginTop: 12, color: '#b91c1c', fontWeight: 700 }}>
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <a href="/register" style={{ color: theme.brand, fontWeight: 800, fontSize: 12 }}>
              Create account
            </a>
            <a href="/forgot-password" style={{ color: theme.brand, fontWeight: 800, fontSize: 12 }}>
              Forgot password?
            </a>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: theme.muted }}>
            Tip: if backend uses a different login payload, update the payload keys in
            <code>src/services/auth.ts</code>.
          </div>
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


