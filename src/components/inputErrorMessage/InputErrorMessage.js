import React from 'react';

const InputErrorMessage = ({ hasError }) => {
  return (
    <div style={{ height: '20px', width: '100%', margin: '3px 0 0 0' }}>
      <p style={{ textAlign: 'right', color: '#ff0000', opacity: hasError ? 1 : 0, margin: 0 }}>
        Обязательное поле
      </p>
    </div>
  );
};

export default InputErrorMessage;
