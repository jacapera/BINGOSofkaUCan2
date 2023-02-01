import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/Login';
import MenuInicial from './componentes/MenuInicial';
import PageUsuarios from './componentes/PageUsuarios';
import PageInicio from './componentes/PageInicio';
import Registrarse from './componentes/Registrarse';
import PageJuego from './componentes/PageJuego';
import Ganador from './componentes/Ganador';


function App() {
  return (
    <div className="App">
      <Router>
          <MenuInicial />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/PageInicio' element={<PageInicio />} />
            <Route path='/PageUsuarios' element={<PageUsuarios />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Registrarse' element={<Registrarse />} />
            <Route path='/PageJuego' element={<PageJuego />} />
            <Route path='/Ganador' element = { <Ganador /> } />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
