import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import OrderTypeChart from './OrderTypeChart'
import RevenueTrendChart from './RevenueTrendChart'

export default function RevenueChart({ orders }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Revenue & Order Types
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <OrderTypeChart orders={orders} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RevenueTrendChart orders={orders} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
