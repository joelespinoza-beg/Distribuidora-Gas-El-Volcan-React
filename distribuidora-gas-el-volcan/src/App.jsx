import React from 'react';
import Catalogo from './pages/Catálogo';
// import Navbar from './components/organism/Navbar';
// import Footer from './components/organism/Footer';

// Ya no importamos App.css porque estamos usando Bootstrap desde main.jsx

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      <main className="flex-grow-1 py-4 container">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Gas El Volcán</h1>
          <p className="lead text-muted">Energía rápida y segura para tu hogar o empresa</p>
        </header>

        {/* aqui cargo la vista completa del Catálogo */}
        <Catalogo />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;