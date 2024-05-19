import React, { useState, useEffect } from 'react';
import axios from 'axios';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';

function Map() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points, setPoints] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sensor data from the first API
        const sensorResponse = await axios.get('http://localhost:8087/api/capteurs');
        const capteurs = sensorResponse.data;

        // Fetch leak status from the second API
        const leakStatusResponse = await axios.get('http://localhost:8087/api/Couleur/leakStatus');
        const leakStatus = leakStatusResponse.data;

        // Map the sensor data with the leak status to determine the point color
        const updatedPoints = capteurs.map(capteur => ({
          id: capteur.sensor_id,
          x: capteur.x,
          y: capteur.y,
          status: leakStatus[capteur.sensor_id] < 50 ? 'green' : 'red', // Determine color based on leak status
        }));

        // Set the points state with the updated points
        setPoints(updatedPoints);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Run only once on component mount

  // Handle click event for a sensor
  const handleClick = async (id) => {
    try {
      // Fetch additional sensor information from the API
      const sensorInfoResponse = await axios.get(`http://localhost:8087/api/information/${id}`);
      const sensorInfo = sensorInfoResponse.data;

      const clickedSensor = points.find(point => point.id === id);
      const selectedSensor = {
        ...clickedSensor,
        droite_id: sensorInfo.droite_id,
        gauche_id: sensorInfo.gauche_id,
        nb_fuite: sensorInfo.nb_fuite,
        nb_reparation: sensorInfo.nb_reparation,
      };

      setSelectedSensor(selectedSensor);
      setSidebarVisible(true);
    } catch (error) {
      console.error('Error fetching sensor information:', error);
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'flex-end', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <img
        src={back}
        alt="map"
        style={{
          width: selectedSensor ? '60%' : '90%', // Adjust width based on selectedSensor
          height: 'auto',
          position: 'absolute',
          top: selectedSensor ? '10%' : '2%', // Adjust top position
          left: selectedSensor ? '2%' : '6%',
          objectFit: 'contain',
          objectPosition: 'center',
          transition: 'background-size 0.5s ease', // Add transition for smooth effect
        }}
      />
      {/* Render sensor points on the map */}
      {points.map(point => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: `${((point.x / 1000) * 100)}%`, // Adjust position based on percentage
            top: `${(point.y / 667) * 100}%`, // Adjust position based on percentage
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: point.status, // Use status directly for background color
            cursor: 'pointer',
          }}
          onClick={() => handleClick(point.id)}
        />
      ))}
      {/* Show sidebar only if a sensor is selected */}
      {selectedSensor && sidebarVisible && <Sidebar sensor={selectedSensor} />}
    </div>
  );
}

export default Map;
