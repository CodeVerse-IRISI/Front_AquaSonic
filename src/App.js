import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import Map from './Components/Map';

function Notification({ message, onClose, small }) {
  const containerStyle = {
    ...styles.container,
    ...(small ? styles.smallContainer : null)
  };

  return (
    <div style={containerStyle}>
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
  smallContainer: {
    padding: '10px', // Réduire le padding pour rendre la notification plus petite
    fontSize: '0.9em', // Réduire la taille de la police
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
        setLeakingSensors(sensors.map(([sensorId]) => ({ id: sensorId, small: false })));
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
      });
  }, []);

  const handleNotificationClose = (sensorId) => {
    setLeakingSensors(leakingSensors.filter(sensor => sensor.id !== sensorId));
  };

  const handlePointClick = (sensorId) => {
    setLeakingSensors(leakingSensors.map(sensor => {
      if (sensor.id === sensorId) {
        return { ...sensor, small: true }; // Rendre la notification de ce capteur plus petite
      } else {
        return sensor;
      }
    }));
  };

  return (
    <div>
      {leakingSensors.map(sensor => (
        <Notification key={sensor.id} message={`Attention : Fuite grave détectée dans le capteur ${sensor.id} !`} onClose={() => handleNotificationClose(sensor.id)} small={sensor.small} />
      ))}
      <Map onPointClick={handlePointClick} />
    </div>
  );
}

export default LeakStatus;
