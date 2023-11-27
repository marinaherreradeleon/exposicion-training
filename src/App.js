
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Indice from './Indice/Indice';
import Event from './Pages/Event/Event';
import Promesas from './Pages/Promesas/Promesas';
import ArrayMethods from './Pages/ArrayMethods/ArrayMethods';


function App() {
  return (
    // Aquuí codigo jsx
    // Animación para cargar
    // Mostramos un índice con los temas
    // Al abrir un tema, mostrar el titulo en position fixed 
    <>
      <Routes>
        <Route path="/" exact element={<Indice />} />
        <Route path="/event-y-event-loop" exact element={<Event/>} />
        <Route path="/promesas-y-fetch" exact element={<Promesas/>} />
        <Route path="/array-methods" exact element={<ArrayMethods/>} />
      </Routes>
    </>
  );
}

export default App;
