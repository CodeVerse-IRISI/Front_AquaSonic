import React, { useState } from 'react';
import Graph from './Graph'; // Import the Graph component

const Sidebar = ({ sensor }) => {
  const [searchDate, setSearchDate] = useState(''); // État pour la valeur de la recherche par date

  // Fonction pour mettre à jour l'état de la recherche par date
  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Filtrer les données du capteur en fonction de la date de recherche
  const filteredData = sensor.data ? sensor.data.filter(entry => entry.date.includes(searchDate)) : [];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '450px',
      height: '100%',
      backgroundColor: 'white',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto', // Add scrolling if content exceeds sidebar height
      zIndex: 999, // Ensure sidebar is above rest of content
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '20px' }}>Sensor Info</h2>
        {/* Ajouter une barre de recherche par date */}
        <input
          type="text"
          placeholder="Rechercher par date..."
          value={searchDate}
          onChange={handleSearchChange}
          style={{ padding: '2px', width: '70%' }}
        />
      </div>
      <p style={{ marginBottom: '10px' }}>ID: <span style={{ color: 'blue' }}>{sensor.id}</span></p>
      <p style={{ marginBottom: '10px' }}>Status: <span style={{ color: sensor.status === 'normal' ? 'green' : 'red' }}>{sensor.status}</span></p>
      <p style={{ marginBottom: '10px' }}>Droite ID: <span style={{ color: 'blue' }}>{sensor.droite_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Gauche ID: <span style={{ color: 'blue' }}>{sensor.gauche_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de fuites: <span style={{ color: 'red' }}>{sensor.nb_fuite}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de réparations: <span style={{ color: 'green' }}>{sensor.nb_reparation}</span></p>
      
      {/* Render Graph component with filtered data */}
      <Graph sensor={{ ...sensor, data: filteredData }} />
    </div>
  );
}

export default Sidebar;
