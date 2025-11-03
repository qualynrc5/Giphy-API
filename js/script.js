console.log("script.js loaded");

let images = [];

const gifContainer = document.querySelector("#gif-container");
const button = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// API endpoint 
const apiKey = "0jUqmODwcuXMAXuzSRMdvPeqIveeB3Cw";
const baseEndpoint = "https://api.giphy.com/v1/gifs/search";

async function fetchGifs(searchTerm = "cats") {
  // Build full endpoint using user input
  const endpoint = `${baseEndpoint}?api_key=${apiKey}&q=${searchTerm}&limit=12&rating=g`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    images = []; // reset images

    data.data.forEach(gif => {
      images.push(gif.images.original.url);
    });

    console.log("Fetched images:", images);
  } catch (err) {
    console.error("Error fetching GIFs:", err);
  }
}

button.addEventListener("click", async () => {
  const searchTerm = searchInput.value || "cats";

  await fetchGifs(searchTerm);

  gifContainer.innerHTML = ""; // clear previous gifs

  images.forEach(url => {
    gifContainer.innerHTML += `
  <div class="col-6 col-md-3 mb-3">
    <img src="${url}" class="img-fluid rounded shadow-sm" />
  </div>
`;
  });
});
