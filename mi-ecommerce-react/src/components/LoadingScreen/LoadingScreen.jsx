
import React from 'react';
import { Spinner } from 'react-bootstrap'; 
import './LoadingScreen.css'; 

const LoadingScreen = () => {
  return (
    <div className="loading-screen-container">
      <div className="loading-content">
        
        <svg className="loading-logo" width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#3498db"/> {/* Engranaje */}
          <path d="M12 5.5C11.17 5.5 10.5 6.17 10.5 7V8.5C10.5 9.33 11.17 10 12 10C12.83 10 13.5 9.33 13.5 8.5V7C13.5 6.17 12.83 5.5 12 5.5Z" fill="#f1c40f"/> {/* Bombilla parte superior */}
          <path d="M12 11C10.62 11 9.5 12.12 9.5 13.5C9.5 14.88 10.62 16 12 16C13.38 16 14.5 14.88 14.5 13.5C14.5 12.12 13.38 11 12 11Z" fill="#f1c40f"/> {/* Bombilla cuerpo */}
          <path d="M12 17C11.17 17 10.5 17.67 10.5 18.5V19C10.5 19.34 10.63 19.65 10.86 19.88L12 21L13.14 19.88C13.37 19.65 13.5 19.34 13.5 19V18.5C13.5 17.67 12.83 17 12 17Z" fill="#f1c40f"/>
          <path d="M16 12C16 12.83 16.67 13.5 17.5 13.5H19C19.34 13.5 19.65 13.37 19.88 13.14L21 12L19.88 10.86C19.65 10.63 19.34 10.5 19 10.5H17.5C16.67 10.5 16 11.17 16 12Z" fill="#f1c40f"/>
          <path d="M5.5 12C5.5 12.83 6.17 13.5 7 13.5H8.5C9.33 13.5 10 12.83 10 12C10 11.17 9.33 10.5 8.5 10.5H7C6.17 10.5 5.5 11.17 5.5 12Z" fill="#f1c40f"/>
          <path d="M12 12.5C11.72 12.5 11.5 12.72 11.5 13V14C11.5 14.28 11.72 14.5 12 14.5C12.28 14.5 12.5 14.28 12.5 14V13C12.5 12.72 12.28 12.5 12 12.5Z" fill="#f1c40f"/>
          <path d="M12 10.5C11.72 10.5 11.5 10.72 11.5 11V12C11.5 12.28 11.72 12.5 12 12.5C12.28 12.5 12.5 12.28 12.5 12V11C12.5 10.72 12.28 10.5 12 10.5Z" fill="#f1c40f"/>
          <path d="M15.5 12C15.5 11.72 15.72 11.5 16 11.5H17C17.28 11.5 17.5 11.72 17.5 12C17.5 12.28 17.28 12.5 17 12.5H16C15.72 12.5 15.5 12.28 15.5 12Z" fill="#f1c40f"/>
          <path d="M8.5 12C8.5 11.72 8.72 11.5 9 11.5H10C10.28 11.5 10.5 11.72 10.5 12C10.5 12.28 10.28 12.5 10 12.5H9C8.72 12.5 8.5 12.28 8.5 12Z" fill="#f1c40f"/>
        </svg>
        
        <h2 className="loading-text">Cargando Mi eCommerce...</h2>
        <Spinner animation="border" variant="primary" className="mt-4" />
        <p className="loading-message">Preparando la mejor experiencia para vos.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;