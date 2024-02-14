let btn = document.querySelector("body");
// let api_key = "04a03760452fdabea07d13c24071c6e3";

let toggleMenu = document.querySelector(".toggle");
toggleMenu.addEventListener("click", () => {
    console.log("clicked");
    let ul = document.querySelector(".bottomHeader");
    ul.classList.toggle("show");
    toggleMenu.classList.toggle("fa-xmark");
    ul.classList.add("bg");
});


let tv = document.getElementById("tv");
var container = document.getElementsByClassName("container");
let url;
let i = 2;
let api_key = "04a03760452fdabea07d13c24071c6e3";
url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;

searchBtn.addEventListener("click", function () {
    let movieName = searchInput.value.trim();
    if (movieName != "") {
        document.querySelector(".container").innerHTML = "";
        getData(movieName);
    }
})

async function getData(movieName) {
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${encodeURIComponent(movieName)}&page=1`;
    
    try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displaySearchResults(results) {
    let container = document.querySelector(".container");
    
    if (results.length === 0) {
        container.innerHTML = "<p>No results found.</p>";
    } else {
        for (let movie of results) {
            container.innerHTML += `<div class="box" onclick="FetchApi(${movie.id})" id="myinput">
                <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="img" />
                <div class="moviesDetails">
                    <div class="leftDetails">
                        <h5>${movie.original_title}</h5>
                        <p>${movie.release_date}</p>
                    </div>
                    <div class="rightDetails rating">${movie.vote_average}%</div>
                </div>
            </div>`;
        }
    }
}

fetchData();
let more = document.querySelector("#showMore");
more.addEventListener("click", showMore);

function showMore() {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${i}`;
    i++;
    fetchData();
    console.log(i)
}

async function FetchApi(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWY4N2ZiYmYyOTlhOGY2NDA4YTQzNzE4OWVlMmJhMiIsInN1YiI6IjY1YzU0MjMwYWE2NTllMDEzMWVkNmNmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HNi8vbFaxpZSH0gPSJsMSHWy2TltfwaR6TrFEUQwqa8',
          'accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle the response data here
        displayMovieDetails(data)
      })
      .catch(error => {
        console.error('Error:=== > ', error);
      });
}

    function displayMovieDetails(movie) {
        
        const modalElement = document.createElement('div');
        modalElement.classList.add('modal', 'fade');
        modalElement.id = 'exampleModal';
        modalElement.setAttribute('tabindex', '-1');
        modalElement.setAttribute('aria-labelledby', 'exampleModalLabel');
        modalElement.setAttribute('aria-hidden', 'true');
    
        // Construct modal content
        modalElement.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content d-flex flex-row bg-white flex-wrap">
                    <div class="modal-header col-xl-6 col-10">
                    <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" style="height:50vh;width:100% " />
                        
                    </div>
                    <div class="col-xl-6 col-10">
                        <h1 style='text-align:left'> ${movie.title}</h1>
                        <p style='text-align:left'> <b>Release date: ${movie.release_date}</b></p>
                        <p style='text-align:left'> ${movie.overview}</p>
                        <p style='text-align:left'><b> Rating ${movie.vote_average} %</b></p>
                        <button type="button" class="btn btn-outline-success btn-sm" style='align-item:left' data-bs-dismiss="modal">8:30 AM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">10:00 AM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">12:30 PM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">3:00 PM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">4:10 PM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">5:30 PM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">8:00 PM</button>
                        <button type="button" class="btn btn-outline-success btn-sm" data-bs-dismiss="modal">10:30 PM</button>
                    
                    </div>
                   
                </div>
            </div>
        `;
    
        // Append the modal to the body
        document.body.appendChild(modalElement);
    
        // Show the modal
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }



function fetchData() {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                i++;
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
                console.log(Error(message));
            }
            return response.json();
        })
        .then((movies) => {
            let container = document.querySelector(".container");
            // console.log(movies.results[i].postser_path)
            console.log(movies);
            let myLen = movies.results.length;
            showMovies();

            function showMovies() {
                for (var j = 0; j < myLen; j++) {
                    let movie = movies.results[j];
                    container.innerHTML += `<div class="box" onclick="FetchApi(${movie.id})" id="myinput" >
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="img" />
  <div class="moviesDetails">
    <div class="leftDetails">
      <h5>${movie.original_title}</h5>
      <p>${movie.release_date}</p>
    </div>
    <div class="rightDetails rating">${movie.vote_average}%</div>
  </div>
</div>`;
                }
            }
        })
        .catch((error) => {
            error.message; // 'An error has occurred: 404'
            console.log(error);
        });
}



