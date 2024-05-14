// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ margin: 0 }}>Logo</h3>
      </div>
      <ul style={{ listStyleType: 'none', marginRight: 80, padding: 0, display: 'flex', alignItems: 'center' }}>
        <li style={{ marginRight: '20px' }}>
          <a href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        </li>
        <li style={{ marginRight: '80px' }}>
          <a href="#rapport" style={{ color: 'white', textDecoration: 'none' }}>Rapport</a>
        </li>
        <li>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;