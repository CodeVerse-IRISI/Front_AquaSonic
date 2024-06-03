import React from 'react';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import logo from '../assets/logo.png'; // Add your logo image to the assets folder

const LeftSidebar = ({ onAddSensorClick }) => {
  return (
    <div style={{ 
      width: '60px', 
      height: '100vh', 
      backgroundColor: '#f4f4f4', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '10px',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <img src={logo} alt="Company Logo" style={{ width: '40px', height: '40px', marginBottom: '20px' }} />
      <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        <HomeIcon />
      </Button>
      <Button variant="contained" color="primary" onClick={onAddSensorClick}>
        <AddIcon />
      </Button>
    </div>
  );
};

export default LeftSidebar;
