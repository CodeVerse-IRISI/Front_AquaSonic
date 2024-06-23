import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';
import { Box, Typography, TextField, Paper } from '@mui/material';

/**
 * Composant Sidebar qui affiche les détails du capteur et le graphique.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.sensor - Les détails du capteur sélectionné.
 */
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
      console.error('Erreur lors de la récupération des données du capteur par date:', error);
    }
  };

  const fetchTodaysSensorData = async (sensorId) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${today}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données du capteur pour aujourd\'hui:', error);
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
          Informations du Capteur:
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
            Nom: <span style={{ color: '#2E3244' }}>{sensorInfo.id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Statut: <span style={{ color: sensorInfo.status === 'normal' ? 'green' : 'red' }}>{sensorInfo.status}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Capteur à droite: <span style={{ color: '#2E3244' }}>{sensorInfo.droite_id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Capteur à gauche: <span style={{ color: '#2E3244' }}>{sensorInfo.gauche_id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Nombre de fuites: <span style={{ color: 'red' }}>{sensorInfo.nb_fuite}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', color: '#317AC1', marginBottom: '10px' }}>
            Nombre de réparations: <span style={{ color: 'green' }}>{sensorInfo.nb_reparation}</span>
          </Typography>
        </Paper>
      )}
      {filteredData.length > 0 && <Graph sensorData={filteredData} />}
    </Box>
  );
};

export default Sidebar;
