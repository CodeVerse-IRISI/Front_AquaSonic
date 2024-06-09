import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../assets/logo.png';

/**
 * Composant LeftSidebar pour la barre latérale de gauche.
 * @param {Object} props - Les propriétés du composant.
 * @param {function} props.onAddSensorClick - Fonction pour gérer l'ajout de capteur.
 * @param {function} props.onParametrSensorClick - Fonction pour gérer les paramètres des capteurs.
 * @param {function} props.onHomeClick - Fonction pour gérer l'accès à l'accueil.
 * @param {function} props.setSidebarVisible - Fonction pour définir la visibilité de la barre latérale.
 */
const LeftSidebar = ({ onAddSensorClick, onParametrSensorClick, onHomeClick, setSidebarVisible }) => {
  const handleLogoClick = () => {
    setSidebarVisible(false);
    onHomeClick();
  };

  return (
    <Box
      sx={{
        width: '40px',
        height: '100vh',
        backgroundColor: '#D5CABC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        position: 'fixed',
        left: 0,
        top: 0,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Company Logo"
        sx={{
          width: '100px',
          height: '100px',
          marginBottom: '80px',
          cursor: 'pointer',
        }}
        onClick={handleLogoClick}
      />
      <Tooltip title="Accueil" placement="right" arrow>
        <IconButton
          color="primary"
          sx={{ marginBottom: '60px' }}
          onClick={handleLogoClick}
        >
          <HomeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ajouter un capteur" placement="right" arrow>
        <IconButton
          color="primary"
          sx={{ marginBottom: '60px' }}
          onClick={onAddSensorClick}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Paramètres" placement="right" arrow>
        <IconButton
          color="primary"
          sx={{ marginBottom: '60px' }}
          onClick={onParametrSensorClick}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LeftSidebar;
