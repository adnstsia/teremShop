// Получаем кнопки "влево" и "вправо" для переключения слайдов
const prevButton = document.querySelector(".productCard_arrow_left");
const buttons = document.querySelectorAll(".productCard_arrow");

// Получаем все изображения и сохраняем их в переменной images
let images = Array.from(document.querySelectorAll(".productCard_photo"));

// Проверяем, если изображение только одно, то блокируем кнопки
if (images.length === 1) {
  buttons.forEach((el) => el.classList.add("arrowDisabled"));
} else {
  function slide(button) {
    const bigImage = document.querySelector(".big");
    const numImages = images.length;

    images.forEach((img) => {
      let imgOrder = parseInt(img.style.order);
      img.style.order =
        (imgOrder + (button === prevButton  ? 1 : -1) + numImages) % numImages;
    });

    const targetImage = document.querySelector('[style*="order: 0;"]');

    toggleBigClass(targetImage, bigImage);
  }

  // Внутренняя функция для обработки клика на изображение
  function handleImageClick() {
    const bigImage = document.querySelector(".big");
    if (this !== bigImage) {
      bigImage.style.order = parseInt(this.style.order);
      this.style.order = 0;

      toggleBigClass(this, bigImage);
    }
  }

  // Функция для добавления и удаления класса big
  function toggleBigClass(targetImage, bigImage) {
    targetImage.classList.add("big");
    bigImage.classList.remove("big");
  }

  // Добавляем обработчик клика на каждое изображение
  images.forEach((img) => {
    img.addEventListener("click", handleImageClick);
  });

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      slide(event.target);
    });
  });
}
