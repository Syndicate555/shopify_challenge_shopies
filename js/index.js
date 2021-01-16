// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
const cart = [];

$(document).ready(()=>{
    $('#searchForm').on('submit', (s) =>{
        let searchMovie = ($('#searchText').val());
        fetchMovies(searchMovie);
        s.preventDefault()
    })
})

function showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
}
function hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

class Movies{

}

function fetchMovies(searchMovie){
    // console.log(searchMovie)
    axios.get(`http://www.omdbapi.com/?s=${searchMovie}&apikey=fb26a757`)
    .then((response) => {
        let movies = response.data.Search
        let output = ''
        // let list = response.data.Search
        // list = movies.map(item => {
        //     const {title} = item.Title
        //     const {image} = item.Poster
        //     const {year} = item.Year
        // })
        $.each(movies, (index, movie)=>{
            output += `
            <div class = "col-md-4">
                <div class = "well text-center">
                    <img src = "${movie.Poster}">
                    <br></br>
                    <h5>${movie.Title}</h5>
                    <div class = buttons>
                        <a onClick = "movieSelected('${movie.imdbID}')" class = "btn btn-primary btn-sm" id = "button" href = "#">Movie Details</a>
                        <a onClick = "saveMovie('${movie.Title}, ${movie.Year}')" class = "btn btn-success btn-sm" id = "button" href = "#">Nominate movie</a>
                        <br></br>
                    </div>
                    
                </div>
            </div>
            `
        })
        if (typeof movies == 'undefined'){
            let result = `<h6 class = "result"> No Movies Found. Try another movie </h6>`
            $('#movies').html(result)
            return
        }
        $('#movies').html(output)
        console.log(cart)



    })
    .catch((error) => {
        console.error(error)

    })
}
function saveMovie(title, year){

    let items = []
    items.push(title)
    if (cart.length == 5 ){
        alert("Nomination limit reached")
    }
    else{
        cart.push(items)
        alert("Movie Nominated")
        sessionStorage.setItem("nominations", JSON.stringify(cart))

    }
  
    console.log(cart)
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id); // Saving the movie ID to the session
    window.location = 'movies.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=fb26a757`)
    .then((response) => {
        let movie = response.data;
        let result = `
        <div class = "row">
            <div class = "col-md-6">
                <img src = "${movie.Poster}" id = "thumbnail">
            </div>
            <div class = "col-md-6">
                <h2>${movie.Title}</h2>
                <ul class = "list-group">
                    <li class = "list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                    <li class = "list-group-item"><strong>Year: </strong>${movie.Year}</li>
                    <li class = "list-group-item"><strong>Released: </strong>${movie.Released}</li>
                    <li class = "list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                    <li class = "list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                    <li class = "list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class = "list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class = "list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    <li class = "list-group-item"><strong>Runtime: </strong>${movie.Runtime}</li>
                    <li class = "list-group-item"><strong>Language: </strong>${movie.Language}</li>
                </ul>
            </div>
        </div>
        <div class = "row">
            <div class = "well">
                <h3>Plot</h3>
                <p>${movie.Plot}</p>
                <hr>
                <div class = buttons>
                    <a href = "http://imdb.com/title/${movie.imdbID}" target = "_blank" class = "btn btn-success">View IMDB Profile</a>
                    <a href = "index.html" class = "btn btn-info">Go Back to Search Page</a>
                    <br></br>
                </div>
            </div>
        </div>
        `
        $('#movie').html(result);
    })
    .catch((error) => {
        console.error(error)

    })
}
class UI {
    getBagButtons(){
        const buttons = [...document.querySelectorAll(".bag-btn")]
    }
}

class Storage{
    
}

document.addEventListtener("DOMContentLoaded", () => {
    const ui = new UI();

})