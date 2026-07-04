// ============================================
// MOVIE SEARCH ENGINE - JAVASCRIPT
// ============================================
// This script handles API calls to OMDb and displays movie information

// OMDb API key for fetching movie data
let key = "cf9c74fb";

// DOM element references
let movieNameRef = document.getElementById("movie-name");      // Input field for movie name
let searchBtn = document.getElementById("search-btn");          // Search button
let result = document.getElementById("result");                 // Container for main result
let similarResults = document.getElementById("similar-results"); // Container for recommended movies

// ============================================
// RECOMMEND SIMILAR MOVIES FUNCTION
// ============================================
// This function analyzes the searched movie's details (title, genre, director)
// and displays 4 similar movie recommendations based on the genre or title match
let getSimilarMovies = (movieData) => {
    // Extract movie details from the API response data
    let title = movieData.Title || "";                                    // Movie title
    let genre = (movieData.Genre || "").split(",")[0].trim().toLowerCase();  // First genre (main genre)
    let director = (movieData.Director || "").toLowerCase();             // Director name
    let actors = (movieData.Actors || "").split(",").map(a => a.trim().toLowerCase()); // Array of actors

    // Initialize recommendations array and convert title to lowercase for comparison
    let recommendations = [];
    let movieTitle = title.toLowerCase();

    // ============================================
    // RECOMMENDATION LOGIC - Check movie titles and genres
    // ============================================
    // Display recommendations based on the movie type
    
    // If the movie is from the Avengers franchise
    if (movieTitle.includes("avengers")) {
        recommendations = [
            { title: "Avengers", poster: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
            { title: "Avengers: Age of Ultron", poster: "https://image.tmdb.org/t/p/w500/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg" },
            { title: "Avengers: Endgame", poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg" },
            { title: "Captain America: Civil War", poster: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNKUofk3eCeh.jpg" },
            { title: "Guardians of the Galaxy", poster: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg" }
        ];
    } 
    // If the movie is from the Baahubali franchise (Indian action films)
    else if (movieTitle.includes("baahubali") || movieTitle.includes("bahubali")) {
        recommendations = [
            { title: "RRR", poster: "https://image.tmdb.org/t/p/w500/xeItgLK9qcafxbd8kY5j0M1vYcJ.jpg" },
            { title: "Eega", poster: "https://image.tmdb.org/t/p/w500/2S0v8zVvR62P3OjfLp4j9T2uEiO.jpg" },
            { title: "Salaar", poster: "https://image.tmdb.org/t/p/w500/7Qp8xffPf8mDJm1qPYovkV7fF0f.jpg" },
            { title: "Kalki 2898 AD", poster: "https://image.tmdb.org/t/p/w500/1h9ClH8Br9Bt2UwkYg6i3E2zdjT.jpg" },
            { title: "Sye Raa Narasimha Reddy", poster: "https://image.tmdb.org/t/p/w500/7nJ4P3qj89fGzs4KUmjYfQ1C8ke.jpg" }
        ];
    } 
    // If the movie is Pushpa (Indian action movie)
    else if (movieTitle.includes("pushpa")) {
        recommendations = [
            { title: "Rangasthalam", poster: "https://image.tmdb.org/t/p/w500/5QWJWuvRKf3wFDGf2rJ12kP6oTA.jpg" },
            { title: "Ala Vaikunthapurramuloo", poster: "https://image.tmdb.org/t/p/w500/4nQ3dFresO2k1z5tPBr0uXUv5WK.jpg" },
            { title: "DJ: Duvvada Jagannadham", poster: "https://image.tmdb.org/t/p/w500/7r89qk4U1dFJrJjX6s0YvZJ3j6N.jpg" },
            { title: "Sarileru Neekevvaru", poster: "https://image.tmdb.org/t/p/w500/5A6z4V0N4d6bV9A1Vv4JxJ7pOQW.jpg" },
            { title: "Ala Vaikunthapurramuloo", poster: "https://image.tmdb.org/t/p/w500/4nQ3dFresO2k1z5tPBr0uXUv5WK.jpg" }
        ];
    } 
    // If the movie is an Action, Sci-Fi, or Fantasy genre
    else if (genre.includes("action") || genre.includes("sci-fi") || genre.includes("fantasy")) {
        recommendations = [
            { title: "The Matrix", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5n.jpg" },
            { title: "Inception", poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
            { title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
            { title: "Dune", poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg" },
            { title: "Mad Max: Fury Road", poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg" }
        ];
    } 
    // If the movie is a Comedy or Romance genre
    else if (genre.includes("comedy") || genre.includes("romance")) {
        recommendations = [
            { title: "The Devil Wears Prada", poster: "https://image.tmdb.org/t/p/w500/2fWodq4Apxyn7xKa5PyNe3K4lL6.jpg" },
            { title: "Crazy, Stupid, Love.", poster: "https://image.tmdb.org/t/p/w500/5w1f5OqEjAzXPn6vLJb6A3Y6x3A.jpg" },
            { title: "About Time", poster: "https://image.tmdb.org/t/p/w500/ezIurBz2fdUc68d0pP3v2kZLYYg.jpg" },
            { title: "La La Land", poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg" }
        ];
    } 
    // Default recommendations for all other genres
    else {
        recommendations = [
            { title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
            { title: "Jurassic Park", poster: "https://image.tmdb.org/t/p/w500/b1xCNnyr9G0Cqjv6YQ4j9RdS4uN.jpg" },
            { title: "The Lion King", poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg" },
            { title: "Arrival", poster: "https://image.tmdb.org/t/p/w500/x2FJsf8fK3s7w4W2G8ZKkT8rK4g.jpg" }
        ];
    }

    // ============================================
    // RENDER RECOMMENDATION CARDS
    // ============================================
    // Take first 4 recommendations, filter for valid posters, and convert to HTML
    similarResults.innerHTML = recommendations
        .slice(0, 4)                                              // Get only first 4 movies
        .filter(item => item.poster && item.poster.includes("http")) // Keep only valid poster URLs
        .map(item => `
            <div class="similar-card" data-movie-name="${item.title}">
                <img src="${item.poster}" alt="${item.title} poster">
                <p>${item.title}</p>
            </div>
        `)
        .join("");

    // ============================================
    // ADD CLICK LISTENERS TO RECOMMENDATION CARDS
    // ============================================
    // When user clicks on a recommended movie, search for it automatically
    document.querySelectorAll('.similar-card').forEach(card => {
        card.addEventListener('click', () => {
            // Get the movie name stored in the card's data attribute
            const selectedMovie = card.getAttribute('data-movie-name');
            if (selectedMovie) {
                // Set the input field to the selected movie name
                movieNameRef.value = selectedMovie;
                // Trigger a new search for that movie
                getMovie();
            }
        });
    });
};

// ============================================
// MAIN SEARCH FUNCTION
// ============================================
// Fetches movie data from OMDb API and displays the results
let getMovie = () => {
    // Get the movie name from input field and remove extra spaces
    let movieName = movieNameRef.value.trim();
    // Build the OMDb API URL with the movie name and API key
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${key}`;

    // ============================================
    // VALIDATION CHECKS
    // ============================================
    // Check if the movie name input is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }

    // Check if API key is valid
    if (key === "" || key === "YOUR_OMDB_API_KEY") {
        result.innerHTML = `<h3 class="msg">Please add a valid OMDb API key</h3>`;
        console.log("OMDb API key is missing.");
        return;
    }

    // ============================================
    // API FETCH REQUEST
    // ============================================
    // Send request to OMDb API to get movie data
    fetch(url)
        // Convert response to JSON format
        .then((resp) => resp.json())
        .then((data) => {
            // Check if the API found the movie
            if (data.Response === "True") {
                // Display movie information in a formatted card
                result.innerHTML = `
                    <div class="movie-card">
                        <div class="movie-header">
                            <!-- Display movie poster or placeholder if not available -->
                            <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${data.Title} poster" class="movie-poster">
                            <div>
                                <!-- Display movie title and basic information -->
                                <h3>${data.Title}</h3>
                                <p><strong>Year:</strong> ${data.Year}</p>
                                <p><strong>Genre:</strong> ${data.Genre}</p>
                                <p><strong>Director:</strong> ${data.Director}</p>
                                <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                            </div>
                        </div>
                        <!-- Display plot summary and cast information -->
                        <p><strong>Plot:</strong> ${data.Plot}</p>
                        <p><strong>Main Cast:</strong> ${data.Actors}</p>
                    </div>
                `;
                // Show similar movie recommendations
                getSimilarMovies(data);
            } else {
                // Display error message if movie not found
                result.innerHTML = `<h3 class="msg">${data.Error || "Movie not found"}</h3>`;
                similarResults.innerHTML = "";
            }
        })
        // Handle network errors
        .catch((error) => {
            console.error("Failed to fetch movie data:", error);
            result.innerHTML = `<h3 class="msg">Failed to load movie data</h3>`;
        });
};

// ============================================
// EVENT LISTENERS
// ============================================
// Add click event listener to search button to trigger movie search
searchBtn.addEventListener("click", getMovie);