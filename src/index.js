// Import de bibliotecas CORE
import React from 'react';
import ReactDOM from 'react-dom/client';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { BrowserRouter } from 'react-router-dom';

// Utilidades
import { particlesOptions } from './utils/utils';
import reportWebVitals from './reportWebVitals';

// Componentes propios
import App from './App';

// CSS
import './index.css';
import 'animate.css';
import "./normalize.css"

const particlesInit = async (main) => {
  await loadFull(main);
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Particles id='tsparticles' init={particlesInit}  options={particlesOptions} />
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
