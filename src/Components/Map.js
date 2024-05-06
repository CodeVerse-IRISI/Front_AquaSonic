// Map.js
import React, { useState } from 'react';
import back from '../assets/back.jpg';
import Sensor from './Sensor';

const Map = () => {
  const [selectedSensor, setSelectedSensor] = useState(null);

  const handleSensorClick = (sensorData) => {
    setSelectedSensor(sensorData);
  };

  return (
    <div style={{ position: 'relative', backgroundImage: `url(${back})`, backgroundSize: 'cover', height: '100vh' }}>
      {/* Render sensors */}
      <Sensor id={1} x={100} y={200} status="normal" onClick={() => handleSensorClick({ id: 1, location: "Location 1", temperature: 25, humidity: 50 })} />
      <Sensor id={2} x={300} y={400} status="normal" onClick={() => handleSensorClick({ id: 2, location: "Location 2", temperature: 28, humidity: 45 })} />
      {/* Add more sensors as needed */}

      {/* Render sensor information */}
      {selectedSensor && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
          <h2>Sensor Information</h2>
          <p>Sensor ID: {selectedSensor.id}</p>
          <p>Location: {selectedSensor.location}</p>
          <p>Temperature: {selectedSensor.temperature}</p>
          <p>Humidity: {selectedSensor.humidity}</p>
          {/* Add more sensor information as needed */}
        </div>
      )}
    </div>
  );
}

export default Map;
