/**
 * File: Dashboard.jsx
 * Objective: Main dashboard layout for Restaurant Owner Dashboard.
 *            Displays KPI stats, order types, frequent orders,
 *            delivery performance, revenue trend, and orders table.
 * Author: Dhinesh S
 * Created Date: 20-09-2025
 * Last Modified Date: 22-09-2025
 * Modified By: Dhinesh S
 * History:
 *   - 20-09-2025: Initial creation of Dashboard structure.
 *   - 21-09-2025: Integrated KPIStats, OrderTypeChart, and RevenueTrendChart.
 *   - 22-09-2025: Fixed alignment and responsive layout issues and added objective and history comments.
 */


import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import orders from "../data/orders.json";
import KPIStats from "../components/KPIStats";
import OrderTypeChart from "../components/OrderTypeChart";
import FrequentOrders from "../components/FrequentOrders";
import DeliveryPerformance from "../components/DeliveryPerformance";
import RevenueTrendChart from "../components/RevenueTrendChart";
import OrdersTable from "../components/OrdersTable";

export default function Dashboard() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9f9f9" }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Restaurant Owner Dashboard
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        gutterBottom
      >
        Overview of orders, revenue and delivery performance
      </Typography>

      {/* KPI Cards */}
      <Box sx={{ mb: 4,display: "flex",
              flexDirection: "column",
              alignItems: "center",   
              justifyContent: "center", 
               }} > 
        <KPIStats orders={orders} />
      </Box>

      {/* Order Types + Frequent Orders + Delivery Performance */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "white",
              height: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",   //  centers content
              justifyContent: "center", //  centers vertically
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Order Types
            </Typography>
            <Box sx={{ flex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
              <OrderTypeChart orders={orders} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <FrequentOrders orders={orders} />
         
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "white",
              height: 400,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Delivery Performance
            </Typography>
            <Box sx={{ flex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
              <DeliveryPerformance orders={orders} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Revenue Trend */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Revenue Trend
        </Typography>
        <Box sx={{ flex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
          <RevenueTrendChart orders={orders} />
        </Box>
      </Box>

      {/* Orders Table */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", //  centers horizontally
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Orders
        </Typography>
        <Box sx={{ width: "100%" }}>
          <OrdersTable orders={orders} />
        </Box>
      </Box>
    </Box>
  );
}
