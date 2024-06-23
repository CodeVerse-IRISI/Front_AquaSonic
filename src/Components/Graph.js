import React from 'react';
import ChartComponent from './ChartComponent';

/**
 * Composant Graph qui affiche les données des capteurs sous forme de graphiques.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.sensorData - Les données à afficher dans les graphiques.
 */
const Graph = ({ sensorData }) => {
  return (
    <div>
      {sensorData.length > 0 ? (
        <>
          <h1 style={{ fontFamily: 'monospace', color:'#585858' }}>Diagrammes: {sensorData[0].sensor_id}</h1>
          {sensorData.map((data, index) => (
            <div key={index}>
              <h2 style={{ color: '#5784BA', textAlign: 'start', textDecoration: 'underline', fontFamily: 'monospace' }}>Appel {index + 1}</h2>
              <ChartComponent data={data} width={400} height={300} />
            </div>
          ))}
        </>
      ) : (
        <p>Aucune donnée disponible pour ce capteur.</p>
      )}
    </div>
  );
};

export default Graph;
