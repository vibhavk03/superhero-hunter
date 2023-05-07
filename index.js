console.log("javascript loaded");

const searchBox = document.getElementById("search-box");
const searchResultsUl = document.getElementById("search-results-ul");

// Blaquesmith check image 404 issue with this one

const displayDetails = async (heroId) => {
  /* reset ul and search box to empty when li is clicked */
  searchResultsUl.innerHTML = "";
  searchBox.value = "";

  let response;
  try {
    response = await fetch(
      `https://www.superheroapi.com/api.php/10219177700206566/${heroId}`
    );
    response = await response.json();
  } catch (error) {
    console.log(error);
    alert("Some error occurred ☹️ Please try again later");
    return;
  }

  if (response.response === "success") {
  }

  // set background
  // console.log(response);
  const heroDetails = document.getElementById("hero-details");
  heroDetails.setAttribute("style", "background: none;");
  heroDetails.setAttribute("style", "background-color: rgba(0, 0, 0, 0.2);");

  // const {image, name, work, connections} = response;

  const heroImage = document.getElementById("hero-image");
  heroImage.setAttribute("src", response.image.url);

  const heroName = document.getElementById("hero-name");
  // clear previous data present
  heroName.innerHTML = ``;
  heroName.innerHTML = `<span>${response.name}</span>`;

  const heroWork = document.getElementById("hero-work");
  const { occupation, base } = response.work;
  heroWork.innerHTML = ``;
  if (occupation !== "-") {
    heroWork.innerHTML = `<span>Occupation:</span> ${occupation}<br>`;
  }
  if (base !== "-") {
    heroWork.innerHTML += `
      <span>Base:</span> ${base}
    `;
  }

  let relatives;
  const heroConnections = document.getElementById("hero-connections");
  if (response.connections) {
    if (response.connections["group-affiliation"] !== "-") {
      heroConnections.innerHTML = `
        <span>Group Affiliations:</span> ${response.connections["group-affiliation"]}<br>
      `;
    }
    relatives = response.connections.relatives;
  }

  // destructure name and alteregos here
  const heroBiography = document.getElementById("hero-biography");
  heroBiography.innerHTML = ``;
  // const { "full-name": fullName } = response.biography;
  // console.log("full", fullName);
  if (response.biography["full-name"]) {
    heroBiography.innerHTML = `<span>Full Name:</span> ${response.biography["full-name"]}<br>`;
  }
  if (response.biography["alter-egos"] !== "No alter egos found.") {
    heroBiography.innerHTML += `
      <span>Alter Egos:</span> ${response.biography["alter-egos"]}
    `;
  }
  if (relatives && relatives !== "-") {
    heroBiography.innerHTML += `
      <span>Relatives:</span> ${relatives}
    `;
  }

  const heroPowerstats = document.getElementById("hero-powerstats");
  const { intelligence, strength, speed, power, combat } = response.powerstats;
  heroPowerstats.innerHTML = ``;
  heroPowerstats.innerHTML = `
    <span>Powerstats:</span><br>
    Intelligence : ${intelligence === "null" ? "unavailable" : intelligence}<br>
    Strength: ${strength === "null" ? "unavailable" : strength}<br>
    Speed: ${speed === "null" ? "unavailable" : speed}<br>
    Power: ${power === "null" ? "unavailable" : power}<br>
    Combat: ${combat === "null" ? "unavailable" : combat}<br>
  `;

  const heroLeaning = document.getElementById("hero-leaning");
  heroLeaning.innerHTML = ``;
  heroLeaning.innerHTML = `<span>Inclination:</span> ${response.biography.alignment.toUpperCase()}`;

  const favouritesButton = document.getElementById("favourites-btn");
  favouritesButton.setAttribute("style", "display:flex;");
  favouritesButton.setAttribute("value", heroId);
};

const addToFavourites = (heroId) => {
  let favouritesArray = JSON.parse(localStorage.getItem("favouriteHeros"));
  if (!favouritesArray) {
    favouritesArray = [heroId];
    localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
    alert("Hero added to your favourites");
  } else if (favouritesArray.includes(heroId)) {
    alert("Already added to your favourites!");
  } else {
    favouritesArray.push(heroId);
    localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
    alert("Hero added to your favourites");
  }
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
    if (response.response === "success" && results) {
      for (elem of results) {
        let listItem = document.createElement("li");
        listItem.innerHTML = elem.name;
        listItem.id = elem.id;
        listItem.addEventListener("click", function () {
          const heroId = this.id;
          displayDetails(heroId);
        });
        searchResultsUl.appendChild(listItem);
      }
    }
  } else {
    searchResultsUl.innerHTML = "";
  }
});
