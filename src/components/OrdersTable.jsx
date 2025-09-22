/**
 * File: OrdersTable.jsx
 * Objective: Displays orders in a tabular format with search, pagination,
 *            and delivery status. Includes status dropdown filter.
 * Author: Dhinesh S
 * Created Date: 20-09-2025
 * Last Modified Date: 23-09-2025
 * Modified By: Dhinesh S
 * History:
 *   - 20-09-2025: Created table layout with MUI DataGrid.
 *   - 21-09-2025: Added pagination and search functionality.
 *   - 22-09-2025: Added objective and history comments.
 *   - 23-09-2025: Integrated status dropdown filter with Autocomplete.
 */

import React, { useState, useMemo } from 'react'
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField,
  TablePagination, Chip, Box, Autocomplete
} from '@mui/material'

const statusColor = (s) => {
  if (s === 'Pending') return 'warning'
  if (s === 'In Transit') return 'info'
  if (s === 'Delivered') return 'success'
  return 'default'
}

export default function OrdersTable({ orders }) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedStatus, setSelectedStatus] = useState(null)

  // Extract unique statuses from data
  const statusOptions = useMemo(() => {
    const statuses = orders.map((order) => order.Order_Status || 'Unknown')
    return [...new Set(statuses)]
  }, [orders])

  // Filter orders based on search query and selected status
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return orders.filter((o) => {
      const id = o?.Order_ID ? String(o.Order_ID).toLowerCase() : ''
      const customer = o?.Customer_Name ? o.Customer_Name.toLowerCase() : ''
      const type = o?.Order_Type ? o.Order_Type.toLowerCase() : ''
      const status = o?.Order_Status ? o.Order_Status.toLowerCase() : ''

      const matchesQuery =
        id.includes(q) || customer.includes(q) || type.includes(q) || status.includes(q)

      const matchesStatus = selectedStatus
        ? o.Order_Status === selectedStatus
        : true

      return matchesQuery && matchesStatus
    })
  }, [orders, query, selectedStatus])

  const handleChangePage = (e, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} gap={2}>
          <Typography variant="h6">Orders</Typography>

          <Autocomplete
            size="small"
            options={statusOptions}
            value={selectedStatus}
            onChange={(event, newValue) => {
              setSelectedStatus(newValue)
              setPage(0) // Reset pagination when filtering
            }}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Filter by Status" />}
          />

          <TextField
            size="small"
            placeholder="Search orders..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(0) 
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delivery Person</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((o, rowIdx) => (
                  <TableRow key={`order-${o.Order_ID}-${rowIdx}`}>
                    <TableCell>{o.Order_ID || '-'}</TableCell>
                    <TableCell>{o.Customer_Name || '-'}</TableCell>
                    <TableCell>{o.Order_Type || '-'}</TableCell>
                    <TableCell>
                      {o.Items?.map((it, idx) => (
                        <div key={`order-${o.Order_ID}-item-${idx}`}>
                          {it.Item_Name} x{it.Quantity}
                        </div>
                      )) || '-'}
                    </TableCell>
                    <TableCell>
                      ₹ {o.Items.reduce((sum, it) => sum + (it.Total_Price || 0), 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip label={o.Order_Status || 'Unknown'} color={statusColor(o.Order_Status)} />
                    </TableCell>
                    <TableCell>{o.Delivery_Person || '-'}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  )
}
