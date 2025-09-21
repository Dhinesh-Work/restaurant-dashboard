import React from 'react'
import { Grid, Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

function KPICard({ title, value, icon, color }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" fontWeight="bold">{value}</Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function KPIStats({ orders }) {
  const totalRevenue = orders.reduce(
    (acc, o) => acc + o.Items.reduce((sum, it) => sum + (it.Total_Price || 0), 0),
    0
  )
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.Order_Status === 'Pending').length
  const inTransit = orders.filter((o) => o.Order_Status === 'In Transit').length
  const delivered = orders.filter((o) => o.Order_Status === 'Delivered').length
  const customers = new Set(orders.map((o) => o.Customer_Name)).size

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="Revenue" value={`₹ ${totalRevenue.toFixed(2)}`} icon={<AttachMoneyIcon />} color="success.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="Total Orders" value={totalOrders} icon={<ShoppingCartIcon />} color="primary.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="Pending Orders" value={pendingOrders} icon={<LocalShippingIcon />} color="warning.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="In Transit" value={inTransit} icon={<LocalShippingIcon />} color="info.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="Delivered" value={delivered} icon={<LocalShippingIcon />} color="secondary.main" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <KPICard title="Customers" value={customers} icon={<PeopleIcon />} color="error.main" />
      </Grid>
    </Grid>
  )
}
