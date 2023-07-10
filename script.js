const APIURL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const profile = document.getElementById('profile')
const searchUser = document.getElementById('searchUser')

// Get initial movies
getMovies(APIURL)

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);

    return respData;
}

function showMovies(movies) {
    profile.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <div class="card h-100 mt-3">
        <img src="${IMGPATH + poster_path}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <p class="card-text">${overview}</p>
        </div>
      </div>
        `

        profile.appendChild(movieEl)
    });
}



searchUser.addEventListener('keyup', (e) => {
    e.preventDefault()

    const searchTerm = searchUser.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCHAPI + searchTerm)

        searchTerm.value = ''
    } else {
        window.location.reload()
    }
})

