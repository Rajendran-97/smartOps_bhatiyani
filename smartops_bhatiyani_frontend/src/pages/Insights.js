import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar, 
  Divider
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';

export default function Insights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/insights")
      .then((res) => res.json())
      .then((data) => setInsights(data));
  }, []);

  const iconMap = {
    tip: <LightbulbIcon fontSize="large" />,
    growth: <TrendingUpIcon fontSize="large" />,
    warning: <WarningIcon fontSize="large" />,
  };

  const colorMap = {
    tip: '#1976d2',
    growth: '#388e3c',
    warning: '#f57c00',
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        🤖 AI Insights
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Rj Pvt. Ltd.
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        8/110, Ganapathy Nagar, Coimbatore, Tamil Nadu.
      </Typography>
            <Divider sx={{ my: 2 }} />


      {/* Insights Grid */}
     <Grid container spacing={3} sx={{ flexGrow: 1, mt: 2 }}>
  {insights.map((insight, index) => (
    <Grid item xs={12} key={index}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor:
              insight.type === 'growth'
                ? '#388e3c'
                : insight.type === 'warning'
                ? '#f57c00'
                : '#1976d2',
            width: 48,
            height: 48,
          }}
        >
          {iconMap[insight.type]}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {insight.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {insight.description}
          </Typography>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>



      {/* Footer*/}
            <Divider sx={{ my: 3 }} />
      
      <Box sx={{ textAlign: 'center', py: 2, mt: 3 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Rj Pvt. Ltd. | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
