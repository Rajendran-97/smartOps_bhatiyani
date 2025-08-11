import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import ChartView from '../components/ChartView';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function Dashboard() {
  const [summaryData, setSummaryData] = useState({});
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetch(`https://smartops-bhatiyani-1.onrender.com/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        setSummaryData(data.summary || {});
        setRevenueData(data.monthlyRevenue || []);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        📊 Dashboard Overview
      </Typography>

      {/* Company Info */}
      <Typography variant="h6" fontWeight="bold">
        Rj Pvt. Ltd.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        8/110, Ganapathy Nagar, Coimbatore, Tamil Nadu.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={4} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd', height: '100%' }}>
            <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
              <WorkOutlineIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Projects</Typography>
              <Typography variant="h5" fontWeight="bold">{summaryData.projects || 0}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={4} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#f1f8e9', height: '100%' }}>
            <Avatar sx={{ bgcolor: '#388e3c', mr: 2 }}>
              <PeopleIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Customers</Typography>
              <Typography variant="h5" fontWeight="bold">{summaryData.customers || 0}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={4} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#fff3e0', height: '100%' }}>
            <Avatar sx={{ bgcolor: '#ef6c00', mr: 2 }}>
              <AssignmentTurnedInIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">Tasks</Typography>
              <Typography variant="h5" fontWeight="bold">{summaryData.tasks || 0}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff', flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="secondary">
          Revenue Trends
        </Typography>
        <ChartView data={revenueData} />
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
