// Map.js
import React, { useState } from 'react';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';

function Map() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points] = useState([
    { 
      id: 1, 
      x: 255, 
      y: 100, 
      status: 'normal',
      droite_id: 'droite1',
      gauche_id: 'gauche1',
      nb_fuite: 3,
      nb_reparation: 2
    },
    { 
      id: 2, 
      x: 400, 
      y: 527, 
      status: 'leak',
      droite_id: 'droite2',
      gauche_id: 'gauche2',
      nb_fuite: 1,
      nb_reparation: 1
    },
    // Ajoutez d'autres points au besoin
  ]);
  const [sidebarVisible, setSidebarVisible] = useState(false); // État pour contrôler la visibilité de la barre latérale
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 }); // Position de l'image de fond

  // Fonction pour gérer le clic sur un point et afficher les informations du capteur
  const handleClick = (id) => {
    // Trouver le capteur cliqué en fonction de son ID
    const clickedSensor = points.find(point => point.id === id);
    setSelectedSensor(clickedSensor);
    // Afficher la barre latérale
    setSidebarVisible(true);
    
    // Décaler l'image vers la droite et vers le haut
    setBackgroundPosition({ x: 50, y: -50 });
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'flex-end', height: '90vh', marginTop: '100px', marginLeft: '30px' }}>
      <div style={{ position: 'relative', flex: 1, maxWidth: sidebarVisible ? '70%' : '90%', transition: 'max-width 0.5s' }}>
      <img src={back} alt="map" style={{ width: '70%', height: '90%', maxWidth: '90%', objectFit: 'cover', objectPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%` }} />
        {/* Points de la carte */}
        {points.map(point => (
          <div
            key={point.id}
            style={{
              position: 'absolute',
              left: `${(point.x / 1000) * 100}%`, // Adaptez la position en fonction de la taille de l'image
              top: `${(point.y / 667) * 100}%`, // Adaptez la position en fonction de la taille de l'image
              transform: 'translate(-50%, -50%)', // Pour centrer le point
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: getPointColor(point.status),
              cursor: 'pointer',
            }}
            onClick={() => handleClick(point.id)}
          ></div>
        ))}
      </div>
      {/* Afficher la barre latérale uniquement si un capteur est sélectionné */}
      {selectedSensor && sidebarVisible && <Sidebar sensor={selectedSensor} />}
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
