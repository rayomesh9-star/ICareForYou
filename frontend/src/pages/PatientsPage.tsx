import React from 'react';
import { Card } from '../ui/Card';
import { PageTitle } from '../ui/PageTitle';

export default function PatientsPage() {
  return (
    <div>
      <PageTitle title="Patients" subtitle="Track patient records" />
      <Card>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Coming soon: list, add and update patients.
        </p>
      </Card>
    </div>
  );
}

