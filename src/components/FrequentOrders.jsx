import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4444']

export default function FrequentOrders({ orders }) {
  const counts = {}
  orders.forEach((o) => {
    o.Items.forEach((it) => {
      counts[it.Item_Name] = (counts[it.Item_Name] || 0) + (it.Quantity || 0)
    })
  })

  const data = Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value) // sort by popularity
    .slice(0, 6) // top 6 items only for clarity

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Frequent Orders (Top Items)
        </Typography>
        <PieChart width={350} height={300}>
          <Pie
            dataKey="value"
            data={data}
            outerRadius={100}
            innerRadius={60} // donut style
            label
          >
            {data.map((entry, index) => (
              <Cell key={`item-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  )
}
