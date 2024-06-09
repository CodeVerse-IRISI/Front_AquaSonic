import React from 'react';
import '../style/Loading.css';

/**
 * Composant Loading pour afficher un indicateur de chargement.
 */
const Loading = () => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

export default Loading;
