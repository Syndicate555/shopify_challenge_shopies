$(document).ready(()=>{
    $('#searchForm').on('submit', (s) =>{
        let searchMovie = ($('#searchText').val());
        fetchMovies(searchMovie);
        s.preventDefault()
    })
})

function fetchMovies(searchMovie){
    // console.log(searchMovie)
    axios.get(`http://www.omdbapi.com/?s=${searchMovie}&apikey=fb26a757`)
    .then((response) => {
        let movies = response.data.Search
        let output = ''
        $.each(movies, (index, movie)=>{
            output += `
            <div class = "col-md-4">
                <div class = "well text-center">
                    <img src = "${movie.Poster}">
                    <br></br>
                    <h5>${movie.Title}</h5>
                    <div class = buttons>
                        <a onClick = "movieSelected('${movie.imdbID}')" class = "btn btn-primary btn-sm" id = "button" href = "#">Movie Details</a>
                        <a  class = "btn btn-primary btn-sm" id = "button" href = "#">Nominate movie</a>
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
        console.log(movies)



    })
    .catch((error) => {
        console.error(error)

    })
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
            <div class = "col-md-4">
                <img src = "${movie.Poster}" class = "thumbnail">
            </div>
            <div class = "col-md-8">
                <h2>${movie.Title}</h2>
                <ul class = "list-group">
                    <li class = "list-group-item"><strong>Genre</strong>${movie.Genre}</li>
                    <li class = "list-group-item"><strong>Year</strong>${movie.Year}</li>
                    <li class = "list-group-item"><strong>Released</strong>${movie.Released}</li>
                    <li class = "list-group-item"><strong>Rated</strong>${movie.Rated}</li>
                    <li class = "list-group-item"><strong>IMDB Rating</strong>${movie.imdbRating}</li>
                    <li class = "list-group-item"><strong>Director</strong>${movie.Director}</li>
                    <li class = "list-group-item"><strong>Writer</strong>${movie.Writer}</li>
                    <li class = "list-group-item"><strong>Actors</strong>${movie.Actors}</li>
                    <li class = "list-group-item"><strong>Runtime</strong>${movie.Runtime}</li>
                    <li class = "list-group-item"><strong>Language</strong>${movie.Language}</li>
                </ul>
            </div>
        </div>
        <div class = "row">
            <div class = "well">
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href = "http://imdb.com/title/${movie.imdbID}" target = "_blank" class = "btn btn-primary">View IMDB Profile</a>
                <a href = "index.html" class = "btn btn-default">Go Back to Search Page</a>
            </div>
        </div>
        `
        $('#movie').html(result);
    })
    .catch((error) => {
        console.error(error)

    })
}