import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function KpiCard({ title, value }) {
  return (
    <Card sx={{ minWidth: 200, m: 1, boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
}
