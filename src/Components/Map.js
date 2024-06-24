import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import axios from 'axios';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';
import Point from './Point';
import Loading from './Loading';

/**
 * Composant Map qui affiche la carte et l'état des capteurs.
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.sidebarVisible - État pour gérer la visibilité de la barre latérale.
 * @param {function} props.setSidebarVisible - Fonction pour définir la visibilité de la barre latérale.
 */
function Map({ sidebarVisible, setSidebarVisible }) {
  const { data: capteurs, error: capteursError, loading: capteursLoading } = useAxios('http://localhost:8087/api/capteurs');
  const { data: leakStatus, error: leakStatusError, loading: leakStatusLoading } = useAxios('http://localhost:8087/api/AquaSonic/Couleur/leakStatus');

  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points, setPoints] = useState([]);
  const [mapSize, setMapSize] = useState({ width: '80%', height: 'auto' });

  useEffect(() => {
    if (capteurs && leakStatus) {
      const updatedPoints = capteurs.map(capteur => ({
        id: capteur.sensor_id,
        x: capteur.x,
        y: capteur.Y,
        status: leakStatus[capteur.sensor_id] > 50 ? 'leak' : 'normal',
      }));

      setPoints(updatedPoints);
    }
  }, [capteurs, leakStatus]);

  useEffect(() => {
    const newMapSize = sidebarVisible ? { width: '50%', height: 'auto' } : { width: '80%', height: 'auto' };
    setMapSize(newMapSize);
  }, [sidebarVisible]);

  const handleClick = async (id) => {
    try {
      const { data: sensorInfo } = await axios.get(`http://localhost:8087/api/information/${id}`);
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
      console.error('Erreur lors de la récupération des informations du capteur:', error);
    }
  };

  if (capteursLoading || leakStatusLoading) {
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
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
        <Loading />
      </div>
    );
  }

  if (capteursError || leakStatusError) {
    return <div>Erreur lors du chargement des données</div>;
  }

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
