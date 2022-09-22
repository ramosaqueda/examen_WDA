console.clear();
const API_KEY = 'VjOeDgDvnHH96ozjHcWyp0zhLGxt9BuE';

const loader = document.createElement('img');
loader.src = 'assets/images/loader.gif';
//document.querySelector('main').appendChild(contenedor);

//https://api.giphy.com/v1/gifs/trending?api_key=VjOeDgDvnHH96ozjHcWyp0zhLGxt9BuE&limit=25&rating=g

const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g`;

/*
<div style="width:100%;height:0;padding-bottom:94%;position:relative;"><iframe src="https://giphy.com/embed/JgReHQJPGaL3KKREbV" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/mixcynmatch-goldendoodmiso-JgReHQJPGaL3KKREbV">via GIPHY</a></p>
*/

const obtenerGif = async function (url) {
  const respuesta = await fetch(url);
  const Gifs = await respuesta.json();

  return Gifs.data;
};

const obtenerTranding = async () => {
  const Trending = await await obtenerGif(url);
  divParent = document.getElementById('gifs');
  Trending.map((item) => {
    const muestra = ` 
    <div class="card shadow-sm">
      <img src="${item.webp}" alt="cosa"/>
      <div class="card-body">
        <p class="card-text">${item.title}</p>
        <div class="d-flex justify-content-between align-items-center">
          
          <small class="text-muted">${item.title} </small>
        </div>
      </div>
    </div>
   `;

    
    divParent.innerHTML = `<div class="col"> <p>${muestra}</p></div>`;
  });

  //<div class="col"></div>
};

window.addEventListener('load', async () => {
  obtenerTranding();
});
