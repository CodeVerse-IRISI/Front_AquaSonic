import React from 'react';

/**
 * Composant Point représentant un capteur sur la carte.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant du capteur.
 * @param {number} props.x - La coordonnée x du capteur.
 * @param {number} props.y - La coordonnée y du capteur.
 * @param {string} props.status - Le statut du capteur ('normal' ou 'leak').
 * @param {function} props.onClick - La fonction de gestionnaire de clic.
 * @param {number} props.containerWidth - La largeur du conteneur.
 * @param {number} props.containerHeight - La hauteur du conteneur.
 */
function Point({ id, x, y, status, onClick, containerWidth, containerHeight }) {
  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: `${(x / containerWidth) * 100}%`,
        top: `${(y / containerHeight) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: status === 'normal' ? 'green' : 'red',
        cursor: 'pointer',
      }}
      onClick={() => onClick(id)}
    />
  );
}

export default Point;
