const searchText = document.getElementById("search-text")
const searchBtn = document.querySelector("#search-btn")
const movieContainer = document.getElementById("movie-container")
let moviesHTML = ""


searchText.addEventListener("keypress", function (e) {
    console.log(e)
    if (e.key === "Enter") {
        searchBtn.click()
    }
})

searchBtn.addEventListener("click", function () {
    moviesHTML = ""
    searchMovies()
    searchText.value = ""
})

function searchMovies() {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=39faa863&s=${searchText.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.Response, data)
            if (data.Response === "True") {
                movieContainer.innerHTML += ""
                for (movie of data.Search) {
                    renderMovies(movie)
                }

            }
            else {
                document.getElementsByClassName("temp-div")[0].innerHTML = `
                <h2>Sorry. No result found. Try different query.</h2>
                `
            }
        })
}

function renderMovies(film) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=39faa863&t=${film.Title}`)
        .then(res => res.json())
        .then(data => {
            moviesHTML += `
                            <section class="movie-information">
                                    <img src="${data.Poster}" alt="test-img">
                                    <div class="basic-info">
                                        <div class="info-one">
                                            <h2>${data.Title}</h2>
                                            <p>⭐</p>
                                            <p>${data.imdbRating}</p>
                                        </div>
                                        <div class="info-two">
                                            <p> ${data.Runtime}</p>
                                            <p> ${data.Genre}</p>
                                            <button class="watchlist" id="${data.Title}"><img src="images/add.png" alt="add-btn">
                                                <p class="watch">Watchlist</p>
                                            </button>
                                        </div>
                                        <p>${data.Plot}</p>
                                    </div>
                            </section>                           
                        `
            movieContainer.innerHTML = moviesHTML

            addEventListeners()

        })
}


function addEventListeners() {
    const addMovie = document.getElementsByClassName("watchlist")
    for (let addBtn of addMovie) {
        addBtn.addEventListener("click", function (e) {
            addToWatchList(e.currentTarget.id)
        })
    }
}

function addToWatchList(id) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=39faa863&t=${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let watchlistJson = localStorage.getItem("watchlist") || JSON.stringify([]);
            let watchlist = JSON.parse(watchlistJson)
            watchlist.push(data)
            localStorage.setItem("watchlist", JSON.stringify(watchlist))
        })
}




