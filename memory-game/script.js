// instead of having array with colors, this array will have a name to reference back and the image source
const IMAGES = [
  {name: "arrow", img: "images/arrow.001.jpeg"},
  {name: "arrow", img: "images/arrow.001.jpeg"},
  {name: "circle", img: "images/circle.001.jpeg"},
  {name: "circle", img: "images/circle.001.jpeg"},
  {name: "diamond", img: "images/diamond.001.jpeg"},
  {name: "diamond", img: "images/diamond.001.jpeg"},
  {name: "star", img: "images/star.001.jpeg"},
  {name: "star", img: "images/star.001.jpeg"},
  {name: "triangle", img: "images/triangle.001.jpeg"},
  {name: "triangle", img: "images/triangle.001.jpeg"},
]; 

IMAGES.sort(() => 0.5 - Math.random()); // randomly sort the images in the array

const gameContainer = document.getElementById("game");  // define entire game div
const scoreContainer = document.getElementById("score"); // define score div

let clickedCards = []; // cards that are being interacted with
let clickedCardsId = []; // cards that are being interacted with
let matchesTotal = []; // used to keep score of matches total
let noClicking = false

// loop through images array to create 10 cards with the corresponding image source
const createCards = () => {
  for (let i = 0; i < IMAGES.length; i++) {
    const card = document.createElement("img"); // create 10 cards
    card.setAttribute("src", "images/closed.001.jpeg"); // image source set to closed
    card.setAttribute("data-id", i); // index will become data id that will then be used to match with an image
    card.addEventListener("click", handleCardClick) // add event listener to each card
    gameContainer.appendChild(card) // add each card to the entire game div
  }
} 

const match = () => {
  let cards = document.querySelectorAll("img"); // select all cards just created
  let card1Id = clickedCardsId[0]; // first clicked card id defined
  let card2Id = clickedCardsId[1]; // second clicked card id defined
  if (card1Id && card2Id) {
    if (card1Id === card2Id) { // check if they are clicking on the same image twice 
      cards[card1Id].setAttribute("src", "images/closed.001.jpeg");
      cards[card2Id].setAttribute("src", "images/closed.001.jpeg");
      matchesTotal.pop(cards) // clicking on the same image twice reduces a point, how to make it so it's not -1 but just -0? ***
    } else if (clickedCards[0] === clickedCards[1]) { // check if the 2 chosen cards match
      // something here so cards cant be clicked anymore
      cards[card1Id].removeEventListener("click", handleCardClick); // shouldn't be able to click when matched
      cards[card2Id].removeEventListener("click", handleCardClick); // shouldn't be able to click when matched
      matchesTotal.push(cards) // add 1 to score
      noClicking = false;
    } else { // what to do when not a match
      cards[card1Id].setAttribute("src", "images/closed.001.jpeg"); // "flip" card back by changing image source back to closed
      cards[card2Id].setAttribute("src", "images/closed.001.jpeg");
      noClicking = false;
    }
  }
  clickedCards = []; // reset to continue with game
  clickedCardsId = []; // reset to continue with game
  scoreContainer.innerText = matchesTotal.length; // Should display a point for each match with 5 points possible

  if (matchesTotal.length === IMAGES.length/2) { // images array is double the amount of possible matches so divide by 2
    scoreContainer.innerText = "You won!"

  }
}

const handleCardClick = () => {
  if(noClicking) return;
  console.log(event.target)
  let cardId = event.target.getAttribute("data-id")
  console.log(cardId)
  clickedCards.push(IMAGES[cardId].name); // add name to the card created from images array
  clickedCardsId.push(cardId);
  event.target.setAttribute("src", IMAGES[cardId].img);
  // this.setAttribute("src", IMAGES[cardId].img) // add image to the card created from images array
  if (clickedCards.length === 2) {
    setTimeout(match, 1000) 
  }
}

createCards();

