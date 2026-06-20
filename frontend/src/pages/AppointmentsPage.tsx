import React from 'react';
import { Card } from '../ui/Card';
import { PageTitle } from '../ui/PageTitle';

export default function AppointmentsPage() {
  return (
    <div>
      <PageTitle
        title="Appointments"
        subtitle="Schedule and manage appointments"
      />
      <Card>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Coming soon: create, reschedule and view appointments.
        </p>
      </Card>
    </div>
  );
}

