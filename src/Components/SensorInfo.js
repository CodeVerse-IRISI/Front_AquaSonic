// SensorInfo.js
import React from 'react';

const SensorInfo = ({ sensor }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: sensor.x + 25, // Adjust position to be next to the point
        top: sensor.y - 25, // Adjust position to be next to the point
        backgroundColor: 'lightgray',
        padding: '5px',
        borderRadius: '5px',
        width: '150px', // Adjust width as needed
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', // Add a box shadow for a subtle effect
      }}
    >
      <h3 style={{ margin: '5px 0' }}>Sensor Info</h3>
      <p style={{ fontSize: '14px', margin: '3px 0' }}>ID: {sensor.id}</p>
      <p style={{ fontSize: '14px', margin: '3px 0' }}>Status: {sensor.status}</p>
      {/* Add more sensor information as needed */}
    </div>
  );
}

export default SensorInfo;
