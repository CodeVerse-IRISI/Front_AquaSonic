import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

/**
 * Composant ChartComponent pour afficher les données des capteurs sous forme de graphique.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données à afficher.
 * @param {number} props.width - La largeur du graphique.
 * @param {number} props.height - La hauteur du graphique.
 */
const ChartComponent = ({ data, width, height }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (data && data.amplitudes) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: data.amplitudes.length }, (_, i) => i + 1),
          datasets: [{
            label: 'Tensions en V',
            data: data.amplitudes,
            borderColor: 'red',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderWidth: 1,
            pointRadius: 1,
          }],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Temps (ms)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Tension',
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, width, height]);

  return (
    <div style={{ width, height }}>
      <canvas ref={chartRef} width={width} height={height}></canvas>
    </div>
  );
};

export default ChartComponent;
