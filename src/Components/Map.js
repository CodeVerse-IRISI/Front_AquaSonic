import React, { useState, useEffect } from 'react';
import axios from 'axios';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';
import Point from './Point';

function Map({ sidebarVisible, setSidebarVisible }) {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points, setPoints] = useState([]);
  const [mapSize, setMapSize] = useState({ width: '80%', height: 'auto' });

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

  useEffect(() => {
    const newMapSize = sidebarVisible ? { width: '50%', height: 'auto' } : { width: '80%', height: 'auto' };
    setMapSize(newMapSize);
  }, [sidebarVisible]);

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'relative', width: mapSize.width, height: mapSize.height }}>
        <img src={back} alt="map" style={{ width: '100%', height: '100%', objectFit: 'contain'}} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
          {points.map(point => (
            <Point
              key={point.id}
              id={point.id}
              x={point.x}
              y={point.y}
              status={point.status}
              onClick={handleClick}
              containerWidth={2000}
              containerHeight={1334}
            />
          ))}
        </div>
      </div>
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