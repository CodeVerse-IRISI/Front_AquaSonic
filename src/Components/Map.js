// Map.js
import React, { useState } from 'react';
import back from '../assets/back.jpg';
import SensorInfo from './SensorInfo';

function Map() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points] = useState([
    { id: 1, x: 255, y: 100, status: 'normal' },
    { id: 2, x: 400, y: 527, status: 'leak' },
    // Ajoutez d'autres points au besoin
  ]);

  // Fonction pour gérer le clic sur un point et afficher les informations du capteur
  const handleClick = (id) => {
    // Trouver le capteur cliqué en fonction de son ID
    const clickedSensor = points.find(point => point.id === id);
    setSelectedSensor(clickedSensor);
  };

  return (
    <div style={{ position: 'relative', backgroundImage: `url(${back})`, backgroundSize: 'cover', height: '100vh' }}>
      {/* Points de la carte */}
      {points.map(point => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: getPointColor(point.status),
            cursor: 'pointer',
            // Vous pouvez ajouter plus de styles au besoin
          }}
          onClick={() => handleClick(point.id)}
        ></div>
      ))}

      {/* Rendre le composant SensorInfo lorsque l'on clique sur un point */}
      {selectedSensor && <SensorInfo sensor={selectedSensor} />}
    </div>
  );
}

// Fonction pour obtenir la couleur du point en fonction de l'état du capteur
const getPointColor = (status) => {
  switch (status) {
    case 'normal':
      return 'green';
    case 'leak':
      return 'red';
    default:
      return 'yellow';
  }
}

export default Map;
