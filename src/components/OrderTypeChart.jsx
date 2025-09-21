import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { Typography } from '@mui/material'

const COLORS = ['#0088FE', '#00C49F']

export default function OrderTypeChart({ orders }) {
  if (!orders || orders.length === 0) {
    return <Typography align="center">No order type data</Typography>
  }

  const counts = orders.reduce((acc, o) => {
    if (o.Order_Type) acc[o.Order_Type] = (acc[o.Order_Type] || 0) + 1
    return acc
  }, {})

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }))

  return (
    <PieChart width={320} height={300}>
      <Pie dataKey="value" data={data} outerRadius={100} label>
        {data.map((entry, index) => (
          <Cell key={`orderType-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}
