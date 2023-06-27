const apiKey = "a02ce9ad75d6ee0e8af6790d7d55b5e0";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const main = document.getElementById("main");
const banner = document.getElementById("banner");

let upcoming_movies = [];
let nowPlaying_movies = [];
let popular_movies = [];
let topRated_movies = [];

let f_upcoming_movies = [];
let f_nowPlaying_movies = [];
let f_popular_movies = [];
let f_topRated_movies = [];

const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const search = document.getElementById("movie_search");
const s_icon = document.getElementById("icon");
search.addEventListener("input", search_movies);

const fetchUpcoming = async () => {
  try {
    const respone = await fetch(`${url}/movie/${upcoming}?api_key=${apiKey}`);
    const data = await respone.json();
    upcoming_movies = data.results;
    add("Upcoming", upcoming_movies);
  } catch (error) {
    console.log(error);
  }
};

const movie_banner = () => {
  console.log(imgUrl + popular_movies[0].poster_path);
  const b_div = `<div
class="banner" style="background-image:${`url(${imgUrl}${popular_movies[0].poster_path})`}">
${popular_movies[0] && `<h1> ${popular_movies[0].original_title} </h1>`}
${popular_movies[0] && `<p>${popular_movies[0].overview}</p>`}
<div>
</div>
</div>`;

  banner.innerHTML = b_div;
};
const fetchNowPlaying = async () => {
  try {
    const respone = await fetch(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
    const data = await respone.json();
    nowPlaying_movies = data.results;
    add("Now Playing", nowPlaying_movies);
  } catch (error) {
    console.log(error);
  }
};

const fetchPopular = async () => {
  try {
    const respone = await fetch(`${url}/movie/${popular}?api_key=${apiKey}`);
    const data = await respone.json();
    popular_movies = data.results;
    add("Popular", popular_movies);
    movie_banner();
  } catch (error) {
    console.log(error);
  }
};

const fetchTopRated = async () => {
  try {
    const respone = await fetch(`${url}/movie/${topRated}?api_key=${apiKey}`);
    const data = await respone.json();
    topRated_movies = data.results;
    add("Top Rated", topRated_movies);
  } catch (error) {
    console.log(error);
  }
};

function add(title, movies) {
  const movieHtml = row(title, movies);
  main.innerHTML += movieHtml;
}

function row(title, movies) {
  return `<section class = "row">
  <h2>${title.toUpperCase()}</h2>
    <div class="inner_row">
   ${
     movies.length != 0
       ? movies.map((item) => card(`${imgUrl}/${item.poster_path}`))
       : `<p>Not Found</p>`
   }
    </div>
    </section>`;
}

function card(image) {
  return `<img class="card" src=${image} alt="Cover" />`;
}

fetchUpcoming();
fetchNowPlaying();
fetchPopular();
fetchTopRated();

function search_movies() {
  main.innerHTML = "";
  const value = search.value.toString();
  if (value === "") {
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  } else {
    banner.innerHTML = "";
    f_upcoming_movies = upcoming_movies.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    add("Upcoming", f_upcoming_movies);
    f_nowPlaying_movies = nowPlaying_movies.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    add("Now Playing", f_nowPlaying_movies);
    f_popular_movies = popular_movies.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    add("Popular", f_popular_movies);

    f_topRated_movies = topRated_movies.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    add("Top Rated", f_topRated_movies);
  }
}
