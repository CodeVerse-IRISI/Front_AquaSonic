import React, { useState, useEffect } from 'react';
import Graph from './Graph'; // Import the Graph component
import axios from 'axios';

const Sidebar = ({ sensor }) => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sensorInfo, setSensorInfo] = useState({
    id: sensor.id,
    status: sensor.status,
    droite_id: sensor.droite_id,
    gauche_id: sensor.gauche_id,
    nb_fuite: sensor.nb_fuite,
    nb_reparation: sensor.nb_reparation,
  });

  // Fonction pour mettre à jour l'état de la recherche par date
  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Fonction pour récupérer les données du capteur par date
  const fetchSensorDataByDate = async (sensorId, dateStr) => {
    try {
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${dateStr}`);
      setFilteredData(response.data);
      
      if (response.data.length > 0) {
        setSensorInfo({
          ...sensorInfo,
          status: response.data[0].status,
          droite_id: response.data[0].droite_id,
          gauche_id: response.data[0].gauche_id,
          nb_fuite: response.data[0].nb_fuite,
          nb_reparation: response.data[0].nb_reparation,
        });
      }
    } catch (error) {
      console.error('Error fetching sensor data by date:', error);
    }
  };

  // Utilisation de useEffect pour appeler fetchSensorDataByDate lorsqu'une nouvelle date est saisie
  useEffect(() => {
    if (searchDate) {
      fetchSensorDataByDate(sensor.id, searchDate);
    }
  }, [searchDate, sensor.id]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '450px',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '20px' }}>Sensor Info</h2>
        <input
          type="text"
          placeholder="Rechercher par date..."
          value={searchDate}
          onChange={handleSearchChange}
          style={{ padding: '2px', width: '70%' }}
        />
      </div>
      <p style={{ marginBottom: '10px' }}>ID: <span style={{ color: 'blue' }}>{sensorInfo.id}</span></p>
      {searchDate && <p>Date de recherche: <span style={{ color: 'blue' }}>{searchDate}</span></p>}
      <p>Status: <span style={{ color: sensorInfo.status }}>{sensorInfo.status}</span></p>
      <p style={{ marginBottom: '10px' }}>Droite ID: <span style={{ color: 'blue' }}>{sensorInfo.droite_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Gauche ID: <span style={{ color: 'blue' }}>{sensorInfo.gauche_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de fuites: <span style={{ color: 'red' }}>{sensorInfo.nb_fuite}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de réparations: <span style={{ color: 'green' }}>{sensorInfo.nb_reparation}</span></p>
      
      {/* Render Graph component with filtered data */}
      {filteredData.length > 0 && <Graph sensorData={filteredData} />}
    </div>
  );
}

export default Sidebar;
