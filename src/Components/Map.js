import React, { useState, useEffect } from 'react';
import axios from 'axios';
import back from '../assets/back.jpg';
import Sidebar from './Sidebar';

function Map() {
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [points, setPoints] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  const [backgroundSize, setBackgroundSize] = useState('90%'); // Adjust initial size as needed

  useEffect(() => {
    // Appel de l'API pour obtenir les coordonnées des points
    axios.get('http://localhost:8087/api/capteurs')
      .then(response => {
        // Les données de la réponse de l'API
        const capteurs = response.data;
        // Mettre à jour les points avec les coordonnées x et y de l'API
        setPoints(capteurs.map(capteur => ({
          id: capteur.id,
          x: capteur.x,
          y: capteur.y,
          status: 'normal', // Définissez la valeur par défaut pour le statut
          droite_id: capteur.droite_id,
          gauche_id: capteur.gauche_id,
          nb_fuite: capteur.nb_fuite,
          nb_reparation: capteur.nb_reparation,
        })));
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
      });
  }, []); // Exécute une seule fois lors du montage du composant

  const handleClick = (id) => {
    // Find the clicked sensor
    const clickedSensor = points.find(point => point.id === id);
    setSelectedSensor(clickedSensor);
    setSidebarVisible(true);

    // Adjust background styles based on click
    if (selectedSensor) {
      // Smaller size after click
      setBackgroundPosition({ x: 0, y: 0 });
      setBackgroundSize('100%'); // Make the image significantly smaller
    } else {
      // Initial size before click
      setBackgroundPosition({ x: 0, y: 0 });
      setBackgroundSize('90%'); // Adjust initial size as needed
    }

    // Adjust point positions to account for sidebar
    setPoints(points.map(point => {
      return {
        ...point,
        x: point.x - (sidebarVisible ? 150 : 0), // Adjust x based on sidebar visibility
      };
    }));
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
      {/* Points de la carte */}
      {points.map(point => (
        <div
          key={point.id}
          style={{
            position: 'absolute',
            left: `${((point.x / 1000) * 100) - (sidebarVisible ? 150 / 100 : 0)}%`, // Adjust position based on sidebar visibility
            top: `${(point.y / 667) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: getPointColor(point.status),
            cursor: 'pointer',
          }}
          onClick={() => handleClick(point.id)}
        />
      ))}
      {/* Afficher la barre latérale uniquement si un capteur est sélectionné */}
      {selectedSensor && sidebarVisible && <Sidebar sensor={selectedSensor} />}
    </div>
  );
}

// Function to get point color based on sensor status
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
