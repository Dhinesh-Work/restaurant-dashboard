import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Typography } from '@mui/material'

export default function RevenueTrendChart({ orders }) {
  if (!orders || orders.length === 0) {
    return <Typography align="center">No revenue data</Typography>
  }

  // Prepare and sort data
  const data = orders
    .map((o) => ({
      order: o.Order_ID,
      revenue: Array.isArray(o.Items)
        ? Math.round(o.Items.reduce((sum, it) => sum + (it.Total_Price || 0), 0))
        : 0,
    }))
    .sort((a, b) => a.order - b.order)

  // Chart width grows with number of orders
  const chartWidth = Math.max(800, orders.length * 80)

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ width: chartWidth, height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 60, bottom: 60 }} // space for labels
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="order"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
              label={{
                value: 'Order ID',
                position: 'insideBottom',
                dy: 40,
                style: { fontWeight: 'bold' },
              }}
            />

            {/* Y Axis */}
            <YAxis
              allowDecimals={false}
              label={{
                value: 'Revenue',
                angle: -90,
                position: 'insideLeft',
                dx: -40,
                style: { fontWeight: 'bold' },
              }}
            />

            <Tooltip formatter={(val) => `₹${val}`} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
