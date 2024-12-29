//for theme toggle
const circle = document.getElementById("circle");
const body = document.body;
const logo = document.querySelector(".logo");
let isToggled = false; //  in dark mode
circle.addEventListener("click", function () {
  if (!isToggled) {
    // light mode
    circle.style.transform = "translateX(21px)"; // Move the toggle button to the left
    body.classList.add("light-theme"); // Add the light theme class to body
    logo.src = "cooltext468859206181618.png"; // Change the logo to light theme logo
  } else {
    // dark mode
    circle.style.transform = "translateX(-1px)"; // Move the toggle button to the right
    body.classList.remove("light-theme"); // Remove the light theme class from body
    logo.src = "cooltext468858624197899.png"; // Change back to dark theme logo
  }

  // Toggle the state
  isToggled = !isToggled;
});

//  movie search
function searchMovie(event) {
  // Prevent the form submission
  event.preventDefault();

  const movieTitle = document.getElementById("search-input").value;
  const apiKey = "2ee3bccd";

  if (!movieTitle) {
    alert("Please enter a movie title.");
    return;
  }

  // Step 1: Clear previous content (home page, featured sections)
  const actionMoviesSection = document.getElementById("action-movies");
  const comedyMoviesSection = document.getElementById("comedy-movies");
  const featuredMoviesSections = document.querySelectorAll(".movies-category");

  // Clear all the featured movie sections
  featuredMoviesSections.forEach((section) => {
    section.innerHTML = ""; // Remove content inside sections
  });
  const carouselSection = document.querySelector(".carousel");

  carouselSection.innerHTML = ""; // Clear the carousel

  // Display loading message while fetching results
  const loadingMessage = document.createElement("div");
  loadingMessage.classList.add("movie-list");
  loadingMessage.innerHTML = "<p>Loading search results...</p>";
  document.body.appendChild(loadingMessage);

  // Fetch  movie data
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`) //
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data from OMDb API");
      }
      return response.json(); // Parse JSON
    })
    .then((data) => {
      // Remove loading message
      loadingMessage.remove();

      // check if the response is valid
      if (data.Response === "True") {
        const movieList = document.createElement("div");
        movieList.classList.add("movie-list");

        // Loop through search results and display each movie
        data.Search.forEach((movie) => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");

          //  Set the movie poster or placeholder if not available   
          const posterImg = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x225?text=No+Image';

          movieCard.innerHTML = `
            <img src="${posterImg}" alt="${movie.Title}">
            <div class="movie-details">
              <h3>${movie.Title} (${movie.Year})</h3>
             
            </div>
          `;
          movieList.appendChild(movieCard);
        });

        // Append the movie list to the body (or to a specific section if needed)
        document.body.appendChild(movieList);
      } else {
        loadingMessage.innerHTML =
          "<p>No movies found. Please try another search.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching movie data.");
    });
}

// Attach the searchMovie function to the search button click
const searchButton = document.getElementById("search-btn"); // Ensure the correct button ID
searchButton.addEventListener("click", searchMovie);

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchMovie(event);
    }
  });

// scrollto top button
