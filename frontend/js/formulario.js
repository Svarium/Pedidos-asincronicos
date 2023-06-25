const $ = (id) => document.getElementById(id)




window.onload = async () => {

let query = new URLSearchParams(location.search);

let id = (query.has('id') && query.get('id'));

try {

    let response = await fetch("http://localhost:3031/api/movies/"+ id)
    let pelicula = await response.json();
    console.log(pelicula);
    let {title, awards, length, release_date, rating} = pelicula.data

   /*  let fecha = new Date(release_date) */
   

    //console.log(pelicula);

    $('title').value = title;
    $('rating').value = rating;
    $('awards').value = awards;
    $('length').value = length;
    $('release_date').value = release_date
    
    
} catch (error) {
    console.log(error);
}


const agregar = document.getElementById('crear')

agregar.addEventListener('click', () => {

    let movie = {
        title :  $('title').value,
        rating:  $('rating').value, 
        awards:  $('awards').value, 
        length:  $('length').value, 
        release_date: $('release_date').value 
    }

    console.log(movie);
    console.log(id);

    let settings = {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {"Content-Type" : "application/json"}
    }
    let url = `http://localhost:3031/api/movies/create`

    fetch(url, settings)
        .then((response) => response.json())
        .then(() => {
             alert("CREADO!")
             window.location.replace("http://127.0.0.1:5500/frontend/home.html")
        })


})





const modificar = document.getElementById('editar')

modificar.addEventListener('click', () => {

    let movieUpdated = {
        title :  $('title').value,
        rating:  $('rating').value, 
        awards:  $('awards').value, 
        length:  $('length').value, 
        release_date: $('release_date').value 
    }

    console.log(movieUpdated);
    console.log(id);

    let settings = {
        method: "PUT",
        body: JSON.stringify(movieUpdated),
        headers: {"Content-Type" : "application/json"}
    }
    let url = `http://localhost:3031/api/movies/update/${id}`

    fetch(url, settings)
        .then((response) => response.json())
        .then(() => {
             alert("modificado!")
             window.location.replace("http://127.0.0.1:5500/frontend/home.html")
        })
  
})

let borrar = document.querySelector('.botonBorrar')

borrar.addEventListener('click', () => {

    let url = `http://localhost:3031/api/movies/delete/${id}`

    let settings = {
        method: "DELETE",
        headers: {"Content-Type" : "application/json"}
    }

    fetch(url, settings)
    .then((response) => response.json())
    .then(() => {
       
         alert("ELIMINADO!")
         window.location.replace("http://127.0.0.1:5500/frontend/home.html")
       
         
    })
})




}