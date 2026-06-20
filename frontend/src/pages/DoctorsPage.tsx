import React from 'react';
import { Card } from '../ui/Card';
import { PageTitle } from '../ui/PageTitle';

export default function DoctorsPage() {
  return (
    <div>
      <PageTitle title="Doctors" subtitle="Manage doctor profiles" />
      <Card>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Coming soon: list, add and update doctors.
        </p>
      </Card>
    </div>
  );
}

