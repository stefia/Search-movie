const movieSearchInput = document.getElementById('movieSearchInput');
const movieSearchButton = document.getElementById('movieSearchButton');

const apiKey = "56abffd9"; 

const movie = document.querySelector('.movie-card');
const movieError = document.querySelector('.movie-error');
const movieInfo = document.querySelector('.movie-info');
const movieTitle = document.querySelector('.movie-info_title');
const movieTags = document.querySelector('.movie-info_tags');
const movieDescr = document.querySelector('.movie-info_descr');
const movieDirector = document.querySelector('.movie-info_director');
const movieWriters = document.querySelector('.movie-info_writers');
const movieStars = document.querySelector('.movie-info_stars');
const movieRating = document.querySelector('.movie-info_rating');
const movieImg = document.querySelector('.movie_img');


async function search() {
    const movieName = movieSearchInput.value.trim();
    if (!movieName) {
        movie.classList.add("hidden")
        movieError.classList.remove("hidden")
        movieError.textContent = "Введите фильм"
    }
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`)
        const data = await response.json()
        if (data.Response === "True") {
            clear()
            showMovie(data)
            movieSearchInput.value = ""
        }
        if (data.Response === "False" && data.Error === "Movie not found!") {
            clear()
            movie.classList.add("hidden")
            movieError.classList.remove("hidden")
            movieError.textContent = "Фильм не найден"
        }
    } catch (error) {
        console.error(error)
        movie.classList.add("hidden")
        movieError.classList.remove("hidden")
        movieError.textContent = "Произошла ошибка"
    }
}

function showMovie(data) {
    movieError.classList.add("hidden")
    movie.classList.remove("hidden")
    movieImg.src = `${data.Poster}`
    const tagsArr = `${data.Genre}`.split(',').map(tag => tag.trim())
    tagsArr.forEach((tag) => {
        const tagCreate = document.createElement('span')
        tagCreate.classList.add('tags')
        tagCreate.textContent = tag
        movieTags.appendChild(tagCreate)
    })
    movieTitle.innerHTML = `<span class="white">${data.Title}</span>`
    movieDescr.innerHTML = `${data.Plot}`
    movieDirector.innerHTML = `Director: <span class="white">${data.Director}</span>`
    movieWriters.innerHTML = `Writers: <span class="white">${data.Writer}</span>`
    movieStars.innerHTML = `Stars: <span class="white">${data.Actors}</span>`
    movieRating.innerHTML = `IMDb Rating: <span class="white">${data.imdbRating}</span>`
}

function hiddenToggle() {
    if (movieError.classList.contains("hidden")) {
        movieError.classList.remove("hidden")
        movie.classList.add("hidden")
    } else {
        movie.classList.remove("hidden")
        movieError.classList.add("hidden")
    }
}

function clear() {
    movieError.textContent = ""
    movieTags.innerHTML = ""
    movieImg.src = ""
    movieTitle.innerHTML = ""
    movieDescr.textContent = ""
    movieDirector.innerHTML = ""
    movieWriters.innerHTML = ""
    movieStars.innerHTML = ""
    movieRating.innerHTML = ""
}

movieSearchButton.addEventListener('click', search);
movieSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        search();
    }
});
