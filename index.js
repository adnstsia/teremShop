// Getting the "left" and "right" buttons for slide navigation
const prevButton = document.querySelector(".productCard_arrow_left");
const buttons = document.querySelectorAll(".productCard_arrow");

// Getting all images and storing them in the variable images
let images = Array.from(document.querySelectorAll(".productCard_photo"));

// Checking if there's only one image, then disable the buttons
if (images.length === 1) {
  buttons.forEach((el) => el.classList.add("arrowDisabled"));
} else {
  function slide(button) {
    const bigImage = document.querySelector(".big");
    const numImages = images.length;

    images.forEach((img) => {
      let imgOrder = parseInt(img.style.order);
      img.style.order =
        (imgOrder + (button === prevButton ? 1 : -1) + numImages) % numImages;
    });

    const targetImage = document.querySelector('[style*="order: 0;"]');

    toggleBigClass(targetImage, bigImage);
  }

  // Inner function to handle image click
  function handleImageClick() {
    const bigImage = document.querySelector(".big");
    if (this !== bigImage) {
      bigImage.style.order = parseInt(this.style.order);
      this.style.order = 0;

      toggleBigClass(this, bigImage);
    }
  }

  // Function to add or remove the 'big' class
  function toggleBigClass(targetImage, bigImage) {
    targetImage.classList.add("big");
    bigImage.classList.remove("big");
  }

  // Adding click event handler to each image
  images.forEach((img) => {
    img.addEventListener("click", handleImageClick);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      slide(event.target);
    });
  });
}
