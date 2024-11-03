//ArrowUp
//ArrowDown
//ArrowLeft
//ArrowRight
// const hoverBox = document.querySelector("#hover");
// const imageBox = document.querySelector("#image1");
// fetching the div that holds the images
const imageBox = document.querySelector("#img-container");
//setting a const for reusing the arrow click action movement step size
const movementLength = 10;
//fetching
const obstacleBox = document.querySelectorAll(".obstacle-container");
//getting the p tag to display error in case of collision
const displayMessage = document.querySelector("#collision-display");
//declaring data needed frequently for the calculation outside the functions
const imageBoxWidth = imageBox.offsetWidth; //getting the width of the div
const imageBoxHeight = imageBox.offsetHeight; //getting the height of the div

window.addEventListener("keydown", (e) => {
  displayMessage.textContent = "";
  //getting the image divs current horizontal and vertical position i.e x and y
  let horizontalPosition =
    parseInt(window.getComputedStyle(imageBox).left) || 0;
  let verticalPosition = parseInt(window.getComputedStyle(imageBox).top) || 0;

  //getting width and height of viewport
  //to check and allow movement only in the visible area of the window
  const viewPortWidth = window.innerWidth; //width of the viewport
  const viewPortHeight = window.innerHeight; //height of the viewport

  // checking the key pressed, and altering the top for up and down arrow
  //left for the left and right arrow
  if (e.key === "ArrowUp" && verticalPosition > 0)
    imageBox.style.top = verticalPosition - movementLength + "px";
  else if (
    e.key === "ArrowDown" &&
    verticalPosition + imageBoxHeight < viewPortHeight
  )
    imageBox.style.top = verticalPosition + movementLength + "px";
  else if (e.key === "ArrowLeft" && horizontalPosition > 0)
    imageBox.style.left = horizontalPosition - movementLength + "px";
  else if (
    e.key === "ArrowRight" &&
    horizontalPosition + imageBoxWidth < viewPortWidth
  ) {
    imageBox.style.left = horizontalPosition + movementLength + "px";
  }
  //check if the movement step goes into a obstacle, if yes, then revert to original positions
  const imageRect = imageBox.getBoundingClientRect();
  if (
    checkingCollision(
      imageRect.top,
      imageRect.bottom,
      imageRect.left,
      imageRect.right
    )
  ) {
    imageBox.style.left = horizontalPosition + "px";
    imageBox.style.top = verticalPosition + "px";
    displayMessage.textContent =
      "Collision alert! It’s a traffic jam, Please redirect";
    imageBox.classList.add("collision-detected-effect");
    setTimeout(function () {
      imageBox.classList.remove("collision-detected-effect");
    }, 500);
  }
});

window.addEventListener("click", (e) => {
  displayMessage.textContent = "";
  //adjusting the x and y of the clicked position to move the image div centered into the clicked position
  let left = e.x - imageBoxWidth / 2;
  let top = e.y - imageBoxHeight / 2;
  // getting the bottom and right co-ordinates by adding the width and height of the div to x and y
  let right = left + imageBoxWidth;
  let bottom = top + imageBoxHeight;

  if (!checkingCollision(top, bottom, left, right)) {
    //moving the center of the image box to the x and y coordinates of the clicked point.
    imageBox.style.left = left + "px";
    imageBox.style.top = top + "px";
  } else {
    displayMessage.textContent =
      "Collision alert! It’s a traffic jam, Please redirect!";
    imageBox.classList.add("collision-detected-effect");
    setTimeout(function () {
      imageBox.classList.remove("collision-detected-effect");
    }, 300);
  }
});

function checkingCollision(top, bottom, left, right) {
  let isOverLap = false;

  for (let obstacle of obstacleBox) {
    const obstacleRect = obstacle.getBoundingClientRect();

    // Check if all sides of `imageRect` overlap with `obstacleRect`
    if (
      top < obstacleRect.bottom &&
      bottom > obstacleRect.top &&
      left < obstacleRect.right &&
      right > obstacleRect.left
    ) {
      isOverLap = true;
      console.log("Orlaping components");
      break; // Stop looping once an overlap is found
    }
  }

  return isOverLap;
}
