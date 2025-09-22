/**
 * File: RevenueTrendChart.jsx
 * Objective: Visualizes the revenue trend across orders using a scrollable line chart.
 *            X-axis represents Order IDs, Y-axis represents Revenue (rounded values).
 *            Helps restaurant owners track revenue growth and order patterns over time.
 * Author: Dhinesh S
 * Created Date: 20-09-2025
 * Last Modified Date: 22-09-2025
 * Modified By: Dhinesh S
 * History:
 *   - 20-09-2025: Initial creation with basic line chart for revenue trend.
 *   - 21-09-2025: Added axis labels (Order ID, Revenue) and tooltip formatting.
 *   - 21-09-2025: Improved responsiveness, enabled scroll for better data visibility.
 *  - 22-09-2025: Added objective and history comments.
 */

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
