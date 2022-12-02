
const movieContainer = document.getElementById("favourites")
let watchListHTML = ""
let parseItems = JSON.parse(localStorage.getItem('watchlist'))

function getList() {
    if (!parseItems.length) {
        movieContainer.innerHTML = `
        <section class="temp-div">
            <h2>Your watchlist looks empty...</h2>
            <div class="add-movies">
               <a href="index.html"><img src="images/add.png" alt="add-btn">
                   Let's add movies</a>
           </div>
        </section>
        `
    } else {
        parseItems.forEach(data => {
            watchListHTML += `
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
                            <button class="watchlist" id="${data.Title}"><img src="images/remove.png" alt="add-btn">
                                <p class="watch">Remove</p>
                            </button>
                        </div>
                        <p>${data.Plot}</p>
                    </div>
            </section>                           
        `
            movieContainer.innerHTML = watchListHTML
            removeMovie()
        })

    }
}


function removeMovie() {
    const removeClass = document.getElementsByClassName("watchlist")
    for (let removeBtn of removeClass) {
        removeBtn.addEventListener("click", function () {
            let id = removeBtn.id
            removeMovieFromLocalStorage(id)

        })
    }
}

function removeMovieFromLocalStorage(id) {
    for (let item of parseItems) {
        if (item.Title === id) {
            let index = parseItems.indexOf(item)
            parseItems.splice(index, 1)
            localStorage.clear();
            localStorage.setItem("watchlist", JSON.stringify(parseItems))
            watchListHTML = ""
            getList()
        }
    }
}

getList()

