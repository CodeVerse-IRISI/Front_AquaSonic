// Sidebar.js
import React from 'react';

const Sidebar = ({ sensor }) => {
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
      overflowY: 'auto', // Ajout d'un défilement si le contenu dépasse la hauteur de la barre latérale
      zIndex: 999, // Assurez-vous que la barre latérale est au-dessus du reste du contenu
    }}>
      <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Sensor Info</h2>
      <p style={{ marginBottom: '10px' }}>ID: <span style={{ color: 'blue' }}>{sensor.id}</span></p>
      <p style={{ marginBottom: '10px' }}>Status: <span style={{ color: sensor.status === 'normal' ? 'green' : 'red' }}>{sensor.status}</span></p>
      <p style={{ marginBottom: '10px' }}>Droite ID: <span style={{ color: 'blue' }}>{sensor.droite_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Gauche ID: <span style={{ color: 'blue' }}>{sensor.gauche_id}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de fuites: <span style={{ color: 'red' }}>{sensor.nb_fuite}</span></p>
      <p style={{ marginBottom: '10px' }}>Nombre de réparations: <span style={{ color: 'green' }}>{sensor.nb_reparation}</span></p>
    </div>
  );
}

export default Sidebar;