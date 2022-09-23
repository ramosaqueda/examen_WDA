console.clear();
import { getObs } from './observer.js';
const API_KEY = 'VjOeDgDvnHH96ozjHcWyp0zhLGxt9BuE';
const API_URL = 'api.giphy.com/v1/gifs';

let offset = 0;
let count = 0;

var ArrayStorage = new Array(); // creamos un array vacío
var getlocal = localStorage.getItem("busquedas");  

const obtenerData = async (url) => {
  const respuesta = await fetch(url);
  const { data } = await respuesta.json();
  return data;
};

//btn = document.getElementById('btn_busqueda');
const titulo = document.getElementById('title_view');

document.getElementById('btn_busqueda').onclick = CargaEvento;
function CargaEvento() {
  BusquedaGif();
}
const divParent = document.getElementById('gifs');
const lista = document.getElementById('preferencias');
 
const MakeImg = (element) => {
  // divParent.replaceChildren();
  count = 0;
  element.map((item) => {
    count += 1;
    const muestra = ` 
    <div class="card shadow-sm">     
      <div class="card-body">
      <a href="${item.url}" target="_blank"> <img src="${item.images.preview_webp.url}" alt="${item.title}"  id="${item.id}"    /> </a>       
        <p class="card-text">${item.title}</p>
        <div class="d-flex justify-content-between align-items-center">          
          <small class="text-muted">${count} </small>
        </div>
      </div>
    </div>
   `;

    divParent.innerHTML += `<div class="col"> ${muestra} </div>`;
  });

  const lastImg = element.pop();
  const ultDiv = document.getElementById(lastImg.id);

  getObs(ultDiv);
};
export const BusquedaGif = async () => {
  divParent.replaceChildren();
  const term = document.getElementById('termino').value;
  ArrayStorage.push(term);
   const dataArr = new Set(ArrayStorage);
 
  let result = [...dataArr];
   
  console.log(result);
  localStorage.setItem("termino", JSON.stringify(result));

  const url = `https://${API_URL}/search?api_key=${API_KEY}&q=${term}`;

  const data = await await obtenerData(url);
  MakeImg(data);
  titulo.replaceChildren();
  titulo.innerHTML = `<h1 class="display-4 fw-bold id="title_view">Resultado de la Búsqueda  ${term} (${count} resultados)</h1>`;
};

export const obtenerTranding = async () => {
  const url = `https://${API_URL}/trending?api_key=${API_KEY}&limit=3&offset=${offset}`;
  const data = await await obtenerData(url);
  offset += 3;
  MakeImg(data);
};

const cargalista = () => {
  const mistorage = JSON.parse(localStorage.getItem("termino"));

  mistorage.forEach(function(item){
    console.log(item);
    var option = document.createElement('option');
    option.value = item;
    lista.appendChild(option);
  });

}


const el = document.getElementById("termino");   
el.addEventListener("change", cargalista, false); 


window.addEventListener('load', async () => {
  obtenerTranding();
 });
