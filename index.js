console.log("javascript loaded");

const searchBox = document.getElementById("search-box");
const searchResultsUl = document.getElementById("search-results-ul");

// Blaquesmith check image 404 issue with this one

const displayDetails = async (heroId) => {
  // reset ul to empty when li is clicked
  searchResultsUl.innerHTML = "";
  searchBox.value = "";

  // maybe add collections also to details

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

  // console.log("!!!!!!!!!!!", response);

  if (response.response === "success") {
  }
  // set background
  const heroDetails = document.getElementById("hero-details");
  heroDetails.setAttribute("style", "background: none;");
  heroDetails.setAttribute("style", "background-color: rgba(0, 0, 0, 0.2);");

  // const heroDetailsLeft = document.getElementById("hero-details-left");
  // heroDetailsLeft.setAttribute("style", "background-color:#ff0000;");

  const heroImage = document.getElementById("hero-image");
  heroImage.setAttribute("src", response.image.url);

  const heroName = document.getElementById("hero-name");
  heroName.innerHTML = response.name;

  const heroWork = document.getElementById("hero-work");
  const { occupation, base } = response.work;
  if (occupation !== "-") {
    heroWork.innerHTML = `Occupation: ${occupation}`;
  }
  if (base !== "-") {
    heroWork.innerHTML += `
      <br />
      Base: ${base}
    `;
  }

  // destructure name and alteregos here
  const heroBiography = document.getElementById("hero-biography");
  if (response.biography["full-name"]) {
    heroBiography.innerHTML = `Full Name: ${response.biography["full-name"]}`;
  }
  if (response.biography["alter-egos"] !== "No alter egos found.") {
    heroBiography.innerHTML += `
      <br />
      Alter Egos: ${response.biography["alter-egos"]}
    `;
  }

  // br is not doing anything here
  const heroPowerstats = document.getElementById("hero-powerstats");
  const { intelligence, strength, speed, power, combat } = response.powerstats;
  // check if any of these are not null
  // check hawk woman
  heroPowerstats.innerHTML = `
    Powerstats:
    <br />
    Intelligence : ${intelligence}
    Strength: ${strength}
    Speed: ${speed}
    Power: ${power}
    Combat: ${combat}
  `;

  const heroLeaning = document.getElementById("hero-leaning");
  heroLeaning.innerHTML = `Inclination: ${response.biography.alignment}`;

  // check overflow of content using jessica jones

  // const btnDiv = document.getElementById("favourites-btn-div");
  const btn = document.getElementById("favourites-btn");
  btn.setAttribute("style", "display:flex;");
  btn.setAttribute("value", heroId);
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
