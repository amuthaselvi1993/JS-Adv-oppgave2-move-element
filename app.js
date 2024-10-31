//ArrowUp
//ArrowDown
//ArrowLeft
//ArrowRight
// const hoverBox = document.querySelector("#hover");
// const imageBox = document.querySelector("#image1");
const imageBox = document.querySelector("#img-container");
const movementLength = 10;
console.log(imageBox);
const obstacleBox = document.querySelectorAll(".obstacle-container");
console.log(obstacleBox);

window.addEventListener("keydown", (e) => {
  const imageBoxWidth = imageBox.offsetWidth;
  const imageBoxHeight = imageBox.offsetHeight;
  const viewPortWidth = window.innerWidth;
  const viewPortHeight = window.innerHeight;
  let horizontalPosition =
    parseInt(window.getComputedStyle(imageBox).left) || 0;
  let verticalPosition = parseInt(window.getComputedStyle(imageBox).top) || 0;
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
  if (blockOverlap()) {
    // imageBox.style.left = horizontalPosition + "px";
    // imageBox.style.top = verticalPosition + "px";
  }
});

window.addEventListener("click", (e) => {
  imageBox.style.left = e.x + "px";
  imageBox.style.top = e.y + "px";
});

function blockOverlap() {
  const imageRect = imageBox.getBoundingClientRect();
  console.log("Image Top: " + imageRect.top);
  console.log("Image Bottom " + imageRect.bottom);
  console.log("Image Left " + imageRect.left);
  console.log("Image Right " + imageRect.right);
  let isOverLap = false;
  console.log(obstacleBox.length);
  if (obstacleBox.length > 0) {
    for (let obstacle of obstacleBox) {
      const obstacleRect = obstacle.getBoundingClientRect();
      console.log("Obstacle Top: " + obstacleRect.top);
      console.log("Obstacle Bottom: " + obstacleRect.bottom);
      console.log("Obstacle Left: " + obstacleRect.left);
      console.log("Obstacle Right: " + obstacleRect.right);
      console.log(
        "imageRect.top < obstacleRect.bottom" + imageRect.top <
          obstacleRect.bottom
      );
      console.log(
        "imageRect.bottom > obstacleRect.top" + imageRect.bottom >
          obstacleRect.top
      );
      console.log(
        " imageRect.left < obstacleRect.right" + imageRect.left <
          obstacleRect.right
      );
      console.log(
        "imageRect.right > obstacleRect.left" + imageRect.right >
          obstacleRect.left
      );
      console.log(
        "Hele condition" +
          (imageRect.top < obstacleRect.bottom ||
            imageRect.bottom > obstacleRect.top ||
            imageRect.left < obstacleRect.right ||
            imageRect.right > obstacleRect.left)
      );
      if (
        imageRect.top < obstacleRect.bottom ||
        imageRect.bottom > obstacleRect.top ||
        imageRect.left < obstacleRect.right ||
        imageRect.right > obstacleRect.left
      ) {
        isOverLap = true;
        console.log(isOverLap);
      }
    }
  } else isOverLap = false;
  return isOverLap;
}
