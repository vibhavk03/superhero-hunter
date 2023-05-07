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
  // console.log(response);
  const heroDetails = document.getElementById("hero-details");
  heroDetails.setAttribute("style", "background: none;");
  heroDetails.setAttribute("style", "background-color: rgba(0, 0, 0, 0.2);");

  // const heroDetailsLeft = document.getElementById("hero-details-left");
  // heroDetailsLeft.setAttribute("style", "background-color:#ff0000;");

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

  // destructure name and alteregos here
  const heroBiography = document.getElementById("hero-biography");
  heroBiography.innerHTML = ``;
  if (response.biography["full-name"]) {
    heroBiography.innerHTML = `<span>Full Name:</span> ${response.biography["full-name"]}<br>`;
  }
  if (response.biography["alter-egos"] !== "No alter egos found.") {
    heroBiography.innerHTML += `
      <span>Alter Egos:</span> ${response.biography["alter-egos"]}
    `;
  }

  // br is not doing anything here
  const heroPowerstats = document.getElementById("hero-powerstats");
  const { intelligence, strength, speed, power, combat } = response.powerstats;
  // check if any of these are not null
  // check hawk woman
  heroPowerstats.innerHTML = ``;
  heroPowerstats.innerHTML = `
    <span>Powerstats:</span><br>
    Intelligence : ${intelligence}<br>
    Strength: ${strength}<br>
    Speed: ${speed}<br>
    Power: ${power}<br>
    Combat: ${combat}<br>
  `;

  const heroLeaning = document.getElementById("hero-leaning");
  heroLeaning.innerHTML = ``;
  heroLeaning.innerHTML = `<span>Inclination:</span> ${response.biography.alignment.toUpperCase()}`;

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
