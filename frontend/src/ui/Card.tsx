import React from 'react';
import { theme } from './theme';

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: 14,
        padding: 16,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      {children}
    </div>
  );
}

