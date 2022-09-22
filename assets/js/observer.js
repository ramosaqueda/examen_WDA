import { obtenerTranding } from './main.js';

const inViewPort = ([e]) => {
  console.log(e);
  const { isIntersecting, target } = e;
  if (isIntersecting) {
    obtenerTranding();
  }
};
const obs = new IntersectionObserver(inViewPort);

export const getObs = (nodo) => {
  obs.observe(nodo);
};
