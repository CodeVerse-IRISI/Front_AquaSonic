import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes,FaExclamationTriangle } from 'react-icons/fa';
import Graph from './Components/Graph';
import Map from './Components/Map';
function Notification({ message, onClose }) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}><FaExclamationTriangle /></div>
      <p style={styles.message}>{message}</p>
      <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#C23028', 
    color: 'white',
    padding: '15px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
  },
  message: {
    margin: '0',
    flexGrow: '1',
  },
   icon: {
    marginRight: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '20px',
  }
};

function LeakStatus() {
  const [sensorData, setSensorData] = useState({});
  const [leakingSensors, setLeakingSensors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8087/api/AquaSonic/AllSensorsDegreeLeak')
      .then(response => {
        setSensorData(response.data);
        // Check gravity for each sensor and add leaking sensors to the list
        const sensors = Object.entries(response.data).filter(([sensorId, gravity]) => gravity >= 75);
        setLeakingSensors(sensors.map(([sensorId]) => sensorId));
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
      });
  }, []);

  return (
    <div>
      {leakingSensors.map(sensorId => (
        <Notification key={sensorId} message={`Attention : Fuite grave détectée dans le capteur ${sensorId} !`} onClose={() => setLeakingSensors(leakingSensors.filter(id => id !== sensorId))} />
      ))}
       <Map/>
       <Graph/>
    </div>
  );
}

export default LeakStatus;
