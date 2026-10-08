import { useState } from 'react';
import CatalogoGas from '../components/organism/CatalogoGas';

function Catalogo() {
  const [cilindros, setCilindros] = useState([
    { 
      id: 1, 
      nombre: 'Cilindro 5 kg', 
      precio: 15000, 
      descripcion: 'Gas licuado normal',
      tipoCliente: 'Persona' 
    },
    { 
      id: 2, 
      nombre: 'Cilindro 11 kg', 
      precio: 20000, 
      descripcion: 'Gas licuado normal',
      tipoCliente: 'Persona' 
    },
    { 
      id: 3, 
      nombre: 'Cilindro 15 kg', 
      precio: 28000, 
      descripcion: 'Gas licuado normal',
      tipoCliente: 'Persona' 
    },
    { 
      id: 4, 
      nombre: 'Cilindro 45 kg', 
      precio: 75000, 
      descripcion: 'Gas licuado industrial',
      tipoCliente: 'Empresa' 
    }
  ]);

  return (
    <div className="container mt-4">
      <CatalogoGas cilindros={cilindros} />
    </div>
  );
}

export default Catalogo;