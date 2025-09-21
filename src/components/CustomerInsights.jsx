import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CustomerInsights({ orders }) {
  const counts = orders.reduce((acc, o) => {
    acc[o.Customer_Name] = (acc[o.Customer_Name] || 0) + 1
    return acc
  }, {})
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }))

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">Top Customers</Typography>
        <Box sx={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
