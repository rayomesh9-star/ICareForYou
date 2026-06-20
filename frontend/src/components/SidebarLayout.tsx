import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { theme } from '../ui/theme';

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
  color: theme.text,
  padding: '10px 12px',
  borderRadius: 12,
  border: `1px solid transparent`,
} as const;

const activeStyle = {
  background: theme.brandSoft,
  border: `1px solid rgba(34,197,94,0.35)`,
} as const;

export default function SidebarLayout() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
      }}
    >
      <aside
        style={{
          background: theme.card,
          borderRight: `1px solid ${theme.border}`,
          padding: 16,
        }}
      >
        <div style={{ padding: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: theme.brandSoft,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.brand,
              fontWeight: 800,
            }}
          >
            i
          </div>
          <div style={{ marginTop: 10, fontWeight: 800, color: theme.text }}>
            IcareForYou
          </div>
          <div style={{ marginTop: 4, color: theme.muted, fontSize: 13 }}>
            Hospital Management
          </div>
        </div>

        <nav style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <NavLink
            to="/doctors"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Doctors
          </NavLink>
          <NavLink
            to="/patients"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/appointments"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Appointments
          </NavLink>
        </nav>
      </aside>

      <main style={{ padding: 18 }}>
        <Outlet />
      </main>
    </div>
  );
}

