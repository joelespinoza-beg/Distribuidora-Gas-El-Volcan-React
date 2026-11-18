import { useContext } from 'react';
import { AutenticacionContext } from '../context/autenticacionContext';

export function useAutenticacion() {
  const contexto = useContext(AutenticacionContext);

  if (contexto === null) {
    throw new Error('useAutenticacion debe usarse dentro de AutenticacionProvider.');
  }

  return contexto;
}
