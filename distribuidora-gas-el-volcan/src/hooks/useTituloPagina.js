import { useEffect } from 'react';



export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Gas El Volcán`;
  }, [titulo]);
}