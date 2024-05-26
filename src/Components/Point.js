import React from 'react';

function Point({ id, x, y, status, onClick }) {
  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: `${((x / 2000) * 100)}%`,
        top: `${(y / 1334) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        marginLeft: '50%',
        marginTop: '10%',
        backgroundColor: status === 'normal' ? 'green' : 'red',
        cursor: 'pointer',
      }}
      onClick={() => onClick(id)}
    />
  );
}

export default Point;
