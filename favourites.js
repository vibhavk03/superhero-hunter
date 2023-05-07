const favouritesDisplayDiv = document.getElementById("favourites-display");
const favouritesHeading = document.getElementById("favourites-heading");

/* get favourites array from local storage */
let favouritesArray = JSON.parse(localStorage.getItem("favouriteHeros"));

/* remove hero id from favourites array and re-render favourite heros */
const removeFromFavourites = (heroId) => {
  favouritesArray = favouritesArray.filter(
    (arrayHeroId) => arrayHeroId !== heroId
  );
  localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
  loadHeros();
};

/* renders the hero onto the page */
const displayHero = async (heroId) => {
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
    const heroOuterDiv = document.createElement("div");
    heroOuterDiv.classList.add("hero-outer-div", "flex");
    heroOuterDiv.innerHTML = `
      <div class="hero-img">
        <img src="${response.image.url}" alt="${response.name}" />
      </div>
      <div class="hero-name">${response.name}</div>
      <div class="hero-remove flex">
        <button
          class="hero-remove-btn"
          type="submit"
          value="${response.id}"
          onclick="removeFromFavourites(this.value)"
        >
          <span>Remove</span> <i class="fa-sharp fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    favouritesDisplayDiv.appendChild(heroOuterDiv);
  }
};

/* calls render function for all the hero ids in the favourites array */
function loadHeros() {
  favouritesDisplayDiv.innerHTML = ``;
  if (favouritesArray.length === 0) {
    /* if no heros left after removing */
    favouritesHeading.innerHTML = "<h2>No Favourites Added yet!</h2>";
    favouritesHeading.setAttribute("id", "no-favourites-yet");
  } else {
    favouritesHeading.innerHTML = "<h2>Your Favourites</h2>";
  }
  /* calling render function for each hero id */
  favouritesArray.forEach((heroId) => {
    displayHero(heroId);
  });
}

if (!favouritesArray) {
  /* no favourite heros added yet */
  favouritesHeading.innerHTML = "<h2>No Favourites Added yet!</h2>";
  favouritesHeading.setAttribute("id", "no-favourites-yet");
} else {
  /* display all favourite heros present in the favourites array */
  loadHeros();
}

// ["415","346","347","73","286","712","299","577","623","630","589","60","165","36","345","317","107","626","150","441"]
