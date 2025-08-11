import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  Box,
  Paper,
  Divider
} from '@mui/material';

export default function Metrics() {
  const [metrics, setMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({ name: '', value: '' });
  const [editId, setEditId] = useState(null);
  const [editMetric, setEditMetric] = useState({ name: '', value: '' });

  // ✅ Use your deployed backend URL here
  const API_BASE = process.env.REACT_APP_API_URL || "https://smartops-bhatiyani-1.onrender.com/";

  // Fetch metrics from backend
  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${API_BASE}/metrics`);
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // Delete metric
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this metric?')) {
      await fetch(`${API_BASE}/metrics/${id}`, { method: 'DELETE' });
      fetchMetrics();
    }
  };

  // Add metric
  const handleAdd = async () => {
    if (!newMetric.name || !newMetric.value) return;
    await fetch(`${API_BASE}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMetric),
    });
    setNewMetric({ name: '', value: '' });
    fetchMetrics();
  };

  // Edit metric
  const startEdit = (metric) => {
    setEditId(metric.id);
    setEditMetric({ name: metric.name, value: metric.value });
  };

  // Update metric
  const handleUpdate = async () => {
    if (!editMetric.name || !editMetric.value) return;
    await fetch(`${API_BASE}/metrics/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editMetric),
    });
    setEditId(null);
    setEditMetric({ name: '', value: '' });
    fetchMetrics();
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Page Header */}
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        📈 Business Metrics
      </Typography>

      {/* Company Info */}
      <Typography variant="h6" fontWeight="bold">
        Rj Pvt. Ltd.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        8/110, Ganapathy Nagar, Coimbatore, Tamil Nadu.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Add New Metric Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Add New Metric</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Metric Name"
            value={newMetric.name}
            onChange={(e) => setNewMetric({ ...newMetric, name: e.target.value })}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Value"
            value={newMetric.value}
            onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
            variant="outlined"
            size="small"
          />
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Paper>

      {/* Metrics Table */}
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '33%', fontWeight: 'bold' }}>Metric</TableCell>
              <TableCell sx={{ width: '33%', fontWeight: 'bold' }}>Value</TableCell>
              <TableCell sx={{ width: '33%', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell sx={{ width: '33%' }}>
                  {editId === metric.id ? (
                    <TextField
                      value={editMetric.name}
                      onChange={(e) => setEditMetric({ ...editMetric, name: e.target.value })}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    metric.name
                  )}
                </TableCell>

                <TableCell sx={{ width: '33%' }}>
                  {editId === metric.id ? (
                    <TextField
                      value={editMetric.value}
                      onChange={(e) => setEditMetric({ ...editMetric, value: e.target.value })}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    metric.value
                  )}
                </TableCell>

                <TableCell sx={{ width: '33%', textAlign: 'center' }}>
                  {editId === metric.id ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={handleUpdate}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        onClick={() => startEdit(metric)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(metric.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Footer */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Rj Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
