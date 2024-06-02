import React, { useState, useEffect } from 'react';
import Map from './Components/Map';
import Notification from './Components/Notification';
import AddSensor from './Components/AddSensor';

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
      <AddSensor/>
    </div>
  );
}

export default LeakStatus;
