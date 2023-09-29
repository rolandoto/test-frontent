import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NextUIProvider } from '@nextui-org/react';
import { AutoProvider } from './privateRoute/AutoProvider';
import CustomNav from './Ui/CustomNav';
import { Toaster } from 'react-hot-toast';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // Ruta al archivo service-worker.js
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <NextUIProvider>  
    <Toaster   position="top-right"reverseOrder={true}  />
      <AutoProvider >
      <App />
      </AutoProvider>
      </NextUIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals