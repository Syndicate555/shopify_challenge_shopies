$(document).ready(()=>{
    $('#searchForm').on('submit', (s) =>{
        console.log($('#searchText').val());
        s.preventDefault()
    })
})