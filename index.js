const searchBox = document.getElementById("search-box");
const searchResultsUl = document.getElementById("search-results-ul");

/* render hero details when hero name clicked in ul in search suggestions */
const displayDetails = async (heroId) => {
  /* reset ul and search box to empty when li is clicked */
  searchResultsUl.innerHTML = "";
  searchBox.value = "";

  let response;
  try {
    response = await fetch(
      `https://www.superheroapi.com/api.php/10219177700206566/${heroId}`
    );
  } catch (error) {
    console.log(error);
    alert("Some error occurred ☹️ Please try again later");
    return;
  }

  if (response.status === 200) {
    response = await response.json();

    /* set background */
    const heroDetails = document.getElementById("hero-details");
    heroDetails.setAttribute("style", "background: none;");
    heroDetails.setAttribute("style", "background-color: rgba(0, 0, 0, 0.2);");

    /* put the scroll bar to top everytime new data rendered */
    const heroDetailsRight = document.getElementById("hero-details-right");
    heroDetailsRight.scrollTop = 0;

    const { image, name, work, connections, biography, powerstats } = response;

    /* set hero image */
    const heroImage = document.getElementById("hero-image");
    if (image.url) {
      heroImage.setAttribute("src", image.url);
    }

    /* set hero-name */
    const heroName = document.getElementById("hero-name");
    heroName.innerHTML = ``; /* clear previous data present */
    heroName.innerHTML = `<span>${name}</span>`;

    /* set hero work */
    const heroWork = document.getElementById("hero-work");
    const { occupation, base } = work;
    heroWork.innerHTML = ``;
    if (occupation !== "-") {
      heroWork.innerHTML = `<span>Occupation:</span> ${occupation}<br>`;
    }
    if (base !== "-") {
      heroWork.innerHTML += `
        <span>Base:</span> ${base}
      `;
    }

    /* set hero connections */
    let relatives;
    const heroConnections = document.getElementById("hero-connections");
    if (connections) {
      const {
        "group-affiliation": groupAffiliation,
        relatives: connectionsRelatives,
      } = connections;
      if (groupAffiliation !== "-") {
        heroConnections.innerHTML = `
          <span>Group Affiliations:</span> ${connections["group-affiliation"]}<br>
        `;
      }
      relatives = connectionsRelatives;
    }

    /* set hero biography */
    const heroBiography = document.getElementById("hero-biography");
    heroBiography.innerHTML = ``;
    const {
      "full-name": fullName,
      "alter-egos": alterEgos,
      alignment,
    } = biography;
    if (fullName) {
      heroBiography.innerHTML = `<span>Full Name:</span> ${response.biography["full-name"]}<br>`;
    }
    if (alterEgos !== "No alter egos found.") {
      heroBiography.innerHTML += `
        <span>Alter Egos:</span> ${alterEgos}<br>
      `;
    }
    if (relatives && relatives !== "-") {
      heroBiography.innerHTML += `
        <span>Relatives:</span> ${relatives}
      `;
    }

    /* set hero powerstats */
    const heroPowerstats = document.getElementById("hero-powerstats");
    const { intelligence, strength, speed, power, combat } = powerstats;
    heroPowerstats.innerHTML = ``;
    heroPowerstats.innerHTML = `
      <span>Powerstats:</span><br>
      Intelligence : ${
        intelligence === "null" ? "unavailable" : intelligence
      }<br>
      Strength: ${strength === "null" ? "unavailable" : strength}<br>
      Speed: ${speed === "null" ? "unavailable" : speed}<br>
      Power: ${power === "null" ? "unavailable" : power}<br>
      Combat: ${combat === "null" ? "unavailable" : combat}<br>
    `;

    /* set hero inclination */
    const heroLeaning = document.getElementById("hero-leaning");
    heroLeaning.innerHTML = ``;
    if (alignment) {
      heroLeaning.innerHTML = `<span>Inclination:</span> ${alignment.toUpperCase()}`;
    }

    /* add favourites button */
    const favouritesButton = document.getElementById("favourites-btn");
    favouritesButton.setAttribute("style", "display:flex;");
    favouritesButton.setAttribute("value", heroId);
  }
};

/* add hero id to favourites array which is stored in local storage */
const addToFavourites = (heroId) => {
  let favouritesArray = JSON.parse(localStorage.getItem("favouriteHeros"));
  if (!favouritesArray) {
    /* adding favourite hero first time */
    favouritesArray = [heroId];
    localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
    alert("Hero added to your favourites");
  } else if (favouritesArray.includes(heroId)) {
    /* hero already in favourites */
    alert("Already added to your favourites!");
  } else {
    /* adding hero to favourites array */
    favouritesArray.push(heroId);
    localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
    alert("Hero added to your favourites");
  }
};

/* clear ul when cancel button is clicked in search bar */
searchBox.addEventListener("search", () => {
  searchResultsUl.innerHTML = "";
});

/* get search query from search box */
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
    } catch (error) {
      console.log(error);
      alert("Some error occurred ☹️ Please try again later");
      return;
    }

    if (response.status === 200) {
      response = await response.json();
      const results = response.results;
      searchResultsUl.innerHTML = ``;
      /* loop over results array and add to ul */
      if (results) {
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
    }
  } else {
    searchResultsUl.innerHTML = "";
  }
});
