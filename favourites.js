console.log("javascript loaded for favourites");

const favouritesDisplayDiv = document.getElementById("favourites-display");

let favouritesArray = JSON.parse(localStorage.getItem("favouriteHeros"));

const removeFromFavourites = () => {
  console.log("hehehehehehhehehehe");
};

if (!favouritesArray) {
  console.log("no favourites");
  favouritesDisplayDiv.innerHTML = "<h2>No Favourites Added yet!</h2>";
} else {
  console.log("favourites");
}
