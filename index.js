console.log("javascript loaded");

const searchBox = document.getElementById("search-box");
const searchResultsUl = document.getElementById("search-results-ul");

searchBox.addEventListener("keyup", async (e) => {
  e.preventDefault();
  let searchQuery = searchBox.value;
  searchQuery = searchQuery.trim();
  searchResultsUl.innerText = " ";

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
    // console.log(response.results);
    const results = response.results;
    searchResultsUl.innerHTML = "";
    // loop over results array and add to ul
    if (results) {
      for (elem of results) {
        const newHTML = `
            <li class="flex">
                ${elem.name}
            </li>`;
        searchResultsUl.innerHTML += newHTML;
      }
    }
  } else {
    searchResultsUl.innerHTML = "";
  }
});
