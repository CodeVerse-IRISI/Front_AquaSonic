import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import Map from './Components/Map';
import SensorDataComponent from './Components/SensorDataComponent'

function Notification({ message, onClose, small }) {
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
      padding: '10px',
      fontSize: '0.9em',
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
    },
  };

  const containerStyle = {
    ...styles.container,
    ...(small ? styles.smallContainer : null),
    position: 'fixed',
    top: 20,
    left: 20, // Position on the left side
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      <div style={styles.icon}><FaExclamationTriangle /></div>
      <p style={styles.message}>{message}</p>
      <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
    </div>
  );
}

function LeakStatus() {
  const [leakingSensors, setLeakingSensors] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8087/ws/sensor-data');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const sensors = Object.entries(data).filter(([sensorId, gravity]) => gravity >= 75);
        setLeakingSensors(sensors.map(([sensorId]) => ({ id: sensorId, small: false })));
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event);
    };

    return () => {
        socket.close();
    };
}, []);

  const handleNotificationClose = (sensorId) => {
    setLeakingSensors(leakingSensors.filter(sensor => sensor.id !== sensorId));
  };

  const handlePointClick = (sensorId) => {
    setLeakingSensors(leakingSensors.map(sensor => {
      if (sensor.id === sensorId) {
        return { ...sensor, small: true };
      } else {
        return sensor;
      }
    }));
  };

  return (
    <div>
      {leakingSensors.map(sensor => (
        <Notification
          key={sensor.id}
          message={`Attention : Fuite grave détectée dans le capteur ${sensor.id} !`}
          onClose={() => handleNotificationClose(sensor.id)}
          small={sensor.small}
        />
      ))}
      <Map onPointClick={handlePointClick} />
      <SensorDataComponent/>
    </div>
  );
}

export default LeakStatus;
