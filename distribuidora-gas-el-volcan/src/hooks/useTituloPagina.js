import { useEffect } from 'react';

// Hook propio: cambia el título de la pestaña del navegador.
// El arreglo [titulo] hace que el efecto se repita solo cuando el título cambia.
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Gas El Volcán`;
  }, [titulo]);
}