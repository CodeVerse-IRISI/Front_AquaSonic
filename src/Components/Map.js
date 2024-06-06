import React, { useState, useEffect } from 'react';
import axios from 'axios';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';
import Point from './Point';

function Map({ sidebarVisible, setSidebarVisible }) {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensorResponse = await axios.get('http://localhost:8087/api/capteurs');
        const capteurs = sensorResponse.data;
        const leakStatusResponse = await axios.get('http://localhost:8087/api/AquaSonic/Couleur/leakStatus');
        const leakStatus = leakStatusResponse.data;

        const updatedPoints = capteurs.map(capteur => ({
          id: capteur.sensor_id,
          x: capteur.X,
          y: capteur.Y,
          status: leakStatus[capteur.sensor_id] > 50 ? 'leak' : 'normal',
        }));

        setPoints(updatedPoints);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (id) => {
    try {
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
          width: sidebarVisible ? '50%' : '80%',
          height: 'auto',
          position: 'absolute',
          top: sidebarVisible ? '10%' : '2%',
          left: sidebarVisible ? '2%' : '6%',
          objectFit: 'contain',
          marginLeft: '65px',
          objectPosition: 'center',
          transition: 'width 0.3s ease, top 0.3s ease, left 0.3s ease',
        }}
      />
      {points.map(point => (
        <Point
          key={point.id}
          id={point.id}
          x={point.x}
          y={point.y}
          status={point.status}
          onClick={handleClick}
        />
      ))}
      {selectedSensor && sidebarVisible && (
        <Sidebar
          key={selectedSensor.id}
          sensor={selectedSensor}
          textColor={selectedSensor.status === 'normal' ? 'green' : 'red'}
        />
      )}
    </div>
  );
}

export default Map;
