/**
 * File: DeliveryPerformance.jsx
 * Objective: Renders delivery performance stats using progress bars.
 *            Displays each delivery person's performance percentage.
 * Author: Dhinesh S
 * Created Date: 20-09-2025
 * Last Modified Date: 22-09-2025
 * Modified By: Dhinesh S
 * History:
 *   - 20-09-2025: Initial creation with static data.
 *   - 21-09-2025: Integrated delivery performance with dynamic order data.
 *  - 22-09-2025: Added objective and history comments.
 */

import React from 'react'
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material'

export default function DeliveryPerformance({ orders }) {
  const stats = {}

  orders.forEach((o) => {
    if (o.Delivery_Person) {
      if (!stats[o.Delivery_Person]) stats[o.Delivery_Person] = { delivered: 0, total: 0 }
      stats[o.Delivery_Person].total += 1
      if (o.Delivery_Status === 'Delivered') stats[o.Delivery_Person].delivered += 1
    }
  })

  const data = Object.entries(stats).map(([name, { delivered, total }]) => ({
    name,
    delivered,
    total,
    percent: Math.round((delivered / total) * 100),
  }))

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Delivery Person
        </Typography>
        {data.map((d) => (
          <Box key={d.name} sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {d.name} — {d.delivered}/{d.total} ({d.percent}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={d.percent}
              sx={{ height: 8, borderRadius: 5 }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
