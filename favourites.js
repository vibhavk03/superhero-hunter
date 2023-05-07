const favouritesDisplayDiv = document.getElementById("favourites-display");
const favouritesHeading = document.getElementById("favourites-heading");

let favouritesArray = JSON.parse(localStorage.getItem("favouriteHeros"));

const removeFromFavourites = (heroId) => {
  favouritesArray = favouritesArray.filter(
    (arrayHeroId) => arrayHeroId !== heroId
  );
  localStorage.setItem("favouriteHeros", JSON.stringify(favouritesArray));
  loadHeros();
};

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

function loadHeros() {
  favouritesDisplayDiv.innerHTML = ``;
  if (favouritesArray.length === 0) {
    favouritesHeading.innerHTML = "<h2>No Favourites Added yet!</h2>";
    favouritesHeading.setAttribute("id", "no-favourites-yet");
  } else {
    favouritesHeading.innerHTML = "<h2>Your Favourites</h2>";
  }
  // use int i = 0 merthod because it is using randomly otherwise
  favouritesArray.forEach(async (heroId) => {
    await displayHero(heroId);
  });
}

if (!favouritesArray) {
  favouritesHeading.innerHTML = "<h2>No Favourites Added yet!</h2>";
  favouritesHeading.setAttribute("id", "no-favourites-yet");
} else {
  loadHeros();
}

//["415","346","347","73","286","712","299","577","623","630","589","60","165","36","345","317","107","626","150","441"]
