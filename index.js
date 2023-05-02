console.log("javascript loaded");

const searchBox = document.getElementById("search-box");
const searchResultsUl = document.getElementById("search-results-ul");

const displayDetails = (elem) => {
  // reset ul to empty when li is clicked
  searchResultsUl.innerHTML = "";
  console.log("!!!!!!!!!!!", elem);
};

// clear ul when cancel button is clicked in search bar
searchBox.addEventListener("search", () => {
  searchResultsUl.innerHTML = "";
});

searchBox.addEventListener("keyup", async (event) => {
  event.preventDefault();
  let searchQuery = searchBox.value;
  searchQuery = searchQuery.trim();

  if (searchQuery.length > 1) {
    let response;
    try {
      response = await fetch(
        `https://www.superheroapi.com/api.php/10219177700206566/search/${searchQuery}`
      );
      response = await response.json();
    } catch (error) {
      console.log(error);
      alert("Some error occurred ☹️ Please try again later");
      return;
    }
    const results = response.results;
    searchResultsUl.innerHTML = "";
    /* loop over results array and add to ul */
    if (results) {
      for (elem of results) {
        const newHTML = `
          <li class="search-suggestion-li flex" onclick=displayDetails(elem)>
            ${elem.name}
          </li>`;
        searchResultsUl.innerHTML += newHTML;
      }
    }
  } else {
    searchResultsUl.innerHTML = "";
  }
});
