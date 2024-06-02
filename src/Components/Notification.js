import React from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

function Notification({ message, onClose, small }) {
  const styles = {
    container: {
      backgroundColor: '#C23028',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      marginBottom: '10px',
    },
    smallContainer: {
      padding: '10px',
      fontSize: '0.9em',
    },
    message: {
      margin: '0',
      flexGrow: '1',
    },
    icon: {
      marginRight: '10px',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '20px',
    },
  };

  const containerStyle = {
    ...styles.container,
    ...(small ? styles.smallContainer : null),
    position: 'fixed',
    top: 20,
    left: 20, // Position on the left side
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      <div style={styles.icon}><FaExclamationTriangle /></div>
      <p style={styles.message}>{message}</p>
      <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
    </div>
  );
}

export default Notification;
