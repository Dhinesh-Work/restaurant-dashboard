import React, { useState, useMemo } from 'react'
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TextField,
  TablePagination, Chip, Box
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

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return orders.filter((o) => {
      const id = o?.Order_ID ? String(o.Order_ID).toLowerCase() : ''
      const customer = o?.Customer_Name ? o.Customer_Name.toLowerCase() : ''
      const type = o?.Order_Type ? o.Order_Type.toLowerCase() : ''
      const status = o?.Order_Status ? o.Order_Status.toLowerCase() : ''
      return id.includes(q) || customer.includes(q) || type.includes(q) || status.includes(q)
    })
  }, [orders, query])

  const handleChangePage = (e, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Orders</Typography>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
