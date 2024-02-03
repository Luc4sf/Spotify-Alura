const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `https://luc4sf.github.io/Spotify-Alura/api-artists/artists.json`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result.artists, searchTerm))
}

function displayResults(result, searchTerm) {
    let results = [];

    result.forEach(element => {
        if (element.name.toLowerCase().indexOf(searchTerm) != -1) {
            results.push(element)
        }
    })

    resultPlaylist.classList.add("hidden")
    const artistName = document.querySelectorAll('#artist-name');
    const artistImage = document.querySelectorAll('#artist-img');
    const artistCard = document.querySelectorAll('#artist-card');
    artistCard.forEach(element => element.classList.add('hidden'));
    
    results.forEach((element, index) => {
        artistName[index].innerText = element.name;
        artistImage[index].src = element.urlImg;
        artistCard[index].classList.remove('hidden')
    });
    
    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return
    }

    requestApi(searchTerm);
})