import React, { useState, useEffect } from 'react';
import Map from './Components/Map';
import Notification from './Components/Notification';
import AddSensor from './Components/AddSensor';
import LeftSidebar from './Components/LeftSidebar';
import Parametre from './Components/Parametre';

/**
 * Composant principal qui gère l'état et la logique pour la détection et l'affichage des capteurs en fuite.
 */
function LeakStatus() {
  const [leakingSensors, setLeakingSensors] = useState([]);
  const [showAddSensorModal, setShowAddSensorModal] = useState(false);
  const [showParametreModal, setShowParametreModal] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8087/ws/sensor-data');

    socket.onopen = () => {
      console.log('Connexion WebSocket établie');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const sensors = Object.entries(data).filter(([sensorId, gravity]) => gravity >= 75);
      setLeakingSensors(sensors.map(([sensorId]) => ({ id: sensorId, small: false })));
    };

    socket.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };

    socket.onclose = (event) => {
      console.log('Connexion WebSocket fermée:', event);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNotificationClose = (sensorId) => {
    setLeakingSensors(leakingSensors.filter(sensor => sensor.id !== sensorId));
  };

  const handlePointClick = (sensorId) => {
    setLeakingSensors(leakingSensors.map(sensor => {
      if (sensor.id === sensorId) {
        return { ...sensor, small: true };
      } else {
        return sensor;
      }
    }));
  };

  const handleAddSensorClick = () => {
    setShowAddSensorModal(true);
  };

  const handleParametreClick = () => {
    setShowParametreModal(true);
  };

  const handleCloseAddSensorModal = () => {
    setShowAddSensorModal(false);
  };

  const handleCloseParametreModal = () => {
    setShowParametreModal(false);
  };

  const handleNavigateToFirstPage = () => {
    console.log("Naviguer vers la première page");
    setSidebarVisible(false);
  };

  return (
    <div>
      {leakingSensors.map(sensor => (
        <Notification
          key={sensor.id}
          message={`Attention : Fuite grave détectée dans le capteur ${sensor.id} !`}
          onClose={() => handleNotificationClose(sensor.id)}
          small={sensor.small}
        />
      ))}
      <Map 
        onPointClick={handlePointClick}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      <LeftSidebar
        onAddSensorClick={handleAddSensorClick}
        onHomeClick={handleNavigateToFirstPage}
        setSidebarVisible={setSidebarVisible} 
        onParametrSensorClick={handleParametreClick}
      />
      <AddSensor showModal={showAddSensorModal} onClose={handleCloseAddSensorModal} />
      <Parametre showModal={showParametreModal} onClose={handleCloseParametreModal} />
    </div>
  );
}

export default LeakStatus;
