import React from 'react';

function Point({ id, x, y, status, onClick, containerWidth, containerHeight }) {
  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: `${(x / containerWidth) * 100}%`,
        top: `${(y / containerHeight) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: status === 'normal' ? 'green' : 'red',
        cursor: 'pointer',
      }}
      onClick={() => onClick(id)}
    />
  );
}

export default Point;