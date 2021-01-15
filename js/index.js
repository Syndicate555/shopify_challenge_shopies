$(document).ready(()=>{
    $('#searchForm').on('submit', (s) =>{
        let searchMovie = ($('#searchText').val());
        s.preventDefault()
    })
})