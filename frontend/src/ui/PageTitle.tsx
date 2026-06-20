import React from 'react';
import { theme } from './theme';

export function PageTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h2 style={{ margin: 0, fontSize: 22, color: theme.text }}>{title}</h2>
      {subtitle ? (
        <p style={{ margin: '6px 0 0', color: theme.muted }}>{subtitle}</p>
      ) : null}
    </div>
  );
}

