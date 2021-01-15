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
        console.log(response.data)


    })
    .catch((error) => {
        console.error(error)

    })

    

}