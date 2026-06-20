import React from 'react';
import SidebarLayout from '../components/SidebarLayout';
import { theme } from '../ui/theme';

export default function DashboardPage() {
  return (
    <div style={{ background: theme.bg, minHeight: '100vh' }}>
      <SidebarLayout />
    </div>
  );
}



