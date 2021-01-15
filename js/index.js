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
            <div class = "col-md-3">
                <div class = "well text-center">
                    <img src = "${movie.Poster}">
                    <h5>${movie.Title}
                    <a onClick = "movieSelected('${movie.imdbID}')" class = "btn btn-primary" href = "#">Movie Details</a>
                </div>
            </div>
            `

        })
        $('#movies').html(output)

        console.log(movies)


    })
    .catch((error) => {
        console.error(error)

    })

    

}