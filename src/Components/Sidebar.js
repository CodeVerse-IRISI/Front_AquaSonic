import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';

const Sidebar = ({ sensor }) => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sensorInfo, setSensorInfo] = useState(sensor);

  useEffect(() => {
    fetchTodaysSensorData(sensor.id);
    setSensorInfo(sensor);
  }, [sensor]);

  const fetchSensorDataByDate = async (sensorId, dateStr) => {
    try {
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${dateStr}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching sensor data by date:', error);
    }
  };

  const fetchTodaysSensorData = async (sensorId) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${today}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching today\'s sensor data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  useEffect(() => {
    if (searchDate) {
      fetchSensorDataByDate(sensor.id, searchDate);
    }
  }, [searchDate, sensor.id]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '450px',
      height: '100%',
      backgroundColor: '#E8EDDF',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginLeft: '2px', color: '#585858' }}>Sensor Info:</h2>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchChange}
          style={{ padding: '3px', width: '25%', marginLeft: 'auto', color: 'blue' }}
        />
      </div>

      {sensorInfo && (
        <>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Name: <span style={{ color: 'blue' }}>{sensorInfo.id}</span>
          </p>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Status: <span style={{ color: sensorInfo.status === 'normal' ? 'green' : 'red' }}>{sensorInfo.status}</span>
          </p>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Right sensor: <span style={{ color: 'blue' }}>{sensorInfo.droite_id}</span>
          </p>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Left sensor: <span style={{ color: 'blue' }}>{sensorInfo.gauche_id}</span>
          </p>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Number of leaks: <span style={{ color: 'red' }}>{sensorInfo.nb_fuite}</span>
          </p>
          <p style={{ fontFamily: 'monospace', color: "#317AC1", marginBottom: '10px', fontSize: '1.1rem' }}>
            Number of repairs: <span style={{ color: 'green' }}>{sensorInfo.nb_reparation}</span>
          </p>
        </>
      )}

      {filteredData.length > 0 && <Graph sensorData={filteredData} />}
    </div>
  );
};

export default Sidebar;
