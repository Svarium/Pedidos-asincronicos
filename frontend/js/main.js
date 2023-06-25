let favoritos = []

window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

  try {
    let response = await fetch("http://localhost:3031/api/movies")
    let peliculas = await response.json()

    let data = peliculas.data;


    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      const a = document.createElement("a");
      a.setAttribute("href", "formulario.html?id="+movie.id);
      a.textContent = "Ver más"
      a.setAttribute("class", "botonAgregar")

      const star = document.createElement('a');
      star.setAttribute('class', 'star');
      star.innerHTML = 'favoritos';
     /*  star.setAttribute('id', 'movie' + movie.id) */

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(a);
      card.appendChild(star);
    });


  } catch (error) {
    console.log(error);
  }

  fetch("http://localhost:3031/api/movies")
  .then((response) => response.json())
  .then((peliculas) => {
    let data = peliculas.data;

  let favoriteMovie = document.querySelectorAll(".star");

  for (let i = 0; i < favoriteMovie.length; i++) {
    const starID = favoriteMovie[i];

    starID.addEventListener("click",() => {
      let index = Array.from(favoriteMovie).indexOf(event.currentTarget);
 let selectedMovie = data[index];
 favoritos.push(selectedMovie);
 localStorage.setItem("movie", JSON.stringify(favoritos)); 
 console.log(JSON.parse(localStorage.getItem("movie")));
      
    });
    
  }

})
 
};

