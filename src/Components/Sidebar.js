import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';

const Sidebar = ({ sensor }) => {
  const [searchDate, setSearchDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sensorInfo, setSensorInfo] = useState(sensor);

  useEffect(() => {
    fetchTodaysSensorData(sensor.id);
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
      const today = new Date().toISOString().slice(0, 10); // Get today's date
      const response = await axios.get(`http://localhost:8087/api/AquaSonic/SensorDataByDate/${sensorId}/${today}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching today\'s sensor data:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  useEffect(() => {
    if (searchDate) {
      fetchSensorDataByDate(sensor.id, searchDate);
    }
  }, [searchDate, sensor.id]);

  const handleSensorClick = async (id) => {
    try {
      const sensorInfoResponse = await axios.get(`http://localhost:8087/api/information/${id}`);
      setSensorInfo(sensorInfoResponse.data);
    } catch (error) {
      console.error('Error fetching sensor information:', error);
    }
  };
  

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
      overflowY: 'auto',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ marginRight: '20px' }}>Sensor Info</h2>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchChange}
          style={{ padding: '2px', width: '70%' }}
        />
      </div>

      {sensorInfo && (
        <>
          <p style={{ marginBottom: '10px' }}>ID: <span style={{ color: 'blue' }}>{sensorInfo.id}</span></p>
          <p>Status: <span style={{ color: sensorInfo.status }}>{sensorInfo.status}</span></p>
          <p style={{ marginBottom: '10px' }}>Right ID: <span style={{ color: 'blue' }}>{sensorInfo.droite_id}</span></p>
          <p style={{ marginBottom: '10px' }}>Left ID: <span style={{ color: 'blue' }}>{sensorInfo.gauche_id}</span></p>
          <p style={{ marginBottom: '10px' }}>Number of leaks: <span style={{ color: 'red' }}>{sensorInfo.nb_fuite}</span></p>
          <p style={{ marginBottom: '10px' }}>Number of repairs: <span style={{ color: 'green' }}>{sensorInfo.nb_reparation}</span></p>
        </>
      )}
      
      {filteredData.length > 0 && <Graph sensorData={filteredData} />}
    </div>
  );
};

export default Sidebar;
