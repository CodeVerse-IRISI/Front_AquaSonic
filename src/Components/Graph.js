import React, { useState, useEffect, useRef } from 'react';
import ChartComponent from './Chart';
import axios from 'axios';

const Graph = () => {
  const [sensorData, setSensorData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8087/api/AquaSonic/GetSensorDataFortwoDays/SENSOR_001');
      setSensorData(result.data);
      
       };
    fetchData();
  }, []);
  
  return (
    <div >
      {sensorData.length > 0 && (
        <>
          <h1 style={{fontFamily:"monospace"}}>Diagrammes du capteur :{sensorData[0].sensor_id}</h1>
          {sensorData.map((data, index) => (
            <div key={index} >
              <h2 style={{color:"#5784BA",textAlign:"start",textDecoration:"underline",fontFamily:"monospace"}}>Appel {index + 1}</h2>
              <ChartComponent data={data} width={400} height={300} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Graph;
