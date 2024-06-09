import React from 'react';

/**
 * Composant Point représentant un capteur sur la carte.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant du capteur.
 * @param {number} props.x - La coordonnée x du capteur.
 * @param {number} props.y - La coordonnée y du capteur.
 * @param {string} props.status - Le statut du capteur ('normal' ou 'leak').
 * @param {function} props.onClick - La fonction de gestionnaire de clic.
 */
function Point({ id, x, y, status, onClick }) {
  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: `${((x / 2000) * 100)}%`,
        top: `${(y / 1334) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginLeft: '50%',
        marginTop: '10%',
        backgroundColor: status === 'normal' ? 'green' : 'red',
        cursor: 'pointer',
      }}
      onClick={() => onClick(id)}
    />
  );
}

export default Point;
