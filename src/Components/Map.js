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
        const sensorResponse = await axios.get('http://localhost:8087/api/capteurs');
        const capteurs = sensorResponse.data;

        const leakStatusResponse = await axios.get('http://localhost:8087/api/AquaSonic/Couleur/leakStatus');
        const leakStatus = leakStatusResponse.data;

        const updatedPoints = capteurs.map(capteur => ({
          id: capteur.sensor_id,
          x: capteur.x,
          y: capteur.y,
          status: leakStatus[capteur.sensor_id] < 50 ? 'green' : 'red',
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
          width: selectedSensor ? '60%' : '90%',
          height: 'auto',
          position: 'absolute',
          top: selectedSensor ? '10%' : '2%',
          left: selectedSensor ? '2%' : '6%',
          objectFit: 'contain',
          objectPosition: 'center',
          transition: 'background-size 0.5s ease',
        }}
      />
      {points.map(point => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: `${((point.x / 1000) * 100)}%`,
            top: `${(point.y / 667) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: point.status,
            cursor: 'pointer',
          }}
          onClick={() => handleClick(point.id)}
        />
      ))}
      {selectedSensor && sidebarVisible && <Sidebar key={selectedSensor.id} sensor={selectedSensor} />}
    </div>
  );
}

export default Map;
