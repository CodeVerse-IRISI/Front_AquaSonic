import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';
import { Box, Typography, TextField, Paper } from '@mui/material';

const Sidebar = ({ sensor }) => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sensorInfo, setSensorInfo] = useState(sensor);

  useEffect(() => {
    fetchTodaysSensorData(sensor.id);
    setSensorInfo(sensor);
  }, [sensor]);

  const fetchSensorDataByDate = async (sensorId, dateStr) => {
    try {
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${dateStr}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching sensor data by date:', error);
    }
  };

  const fetchTodaysSensorData = async (sensorId) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${today}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching today\'s sensor data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  useEffect(() => {
    if (searchDate) {
      fetchSensorDataByDate(sensor.id, searchDate);
    }
  }, [searchDate, sensor.id]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '450px',
        height: '100%',
        backgroundColor: '#D5CABC',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', color: '#D5CABC', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ marginRight: '20px', color: '#333' }}>
          Sensor Info:
        </Typography>
        <TextField
          type="date"
          value={searchDate}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{ marginLeft: 'auto' }}
        />
      </Box>
      {sensorInfo && (
        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', color: '#D5CABC'}}>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Name: <span style={{ color: '#2E3244' }}>{sensorInfo.id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Status: <span style={{ color: sensorInfo.status === 'normal' ? 'green' : 'red' }}>{sensorInfo.status}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Right sensor: <span style={{ color: '#2E3244' }}>{sensorInfo.droite_id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Left sensor: <span style={{ color: '#2E3244' }}>{sensorInfo.gauche_id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Number of leaks: <span style={{ color: 'red' }}>{sensorInfo.nb_fuite}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Number of repairs: <span style={{ color: 'green' }}>{sensorInfo.nb_reparation}</span>
          </Typography>
        </Paper>
      )}
      {filteredData.length > 0 && <Graph sensorData={filteredData} />}
    </Box>
  );
};

export default Sidebar;