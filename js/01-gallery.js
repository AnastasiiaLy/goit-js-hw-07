import { galleryItems } from "./gallery-items.js";

const imagesList = document.querySelector(".gallery");

imagesList.addEventListener("click", onImageClick);

const imagesMarkup = createImagesMarkup(galleryItems);

imagesList.innerHTML = imagesMarkup;

function createImagesMarkup(images) {
  return images
    .map(
      (image) => `<li class="gallery__item">
  <a class="gallery__link" href="${image.original}">
    <img
    
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`
    )
    .join("");
}

function showImage(imageSource) {
  const instance = basicLightbox.create(
    `
    <img src="${imageSource}" width="800" height="600">
  `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscClick);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscClick);
      },
    }
  );

  function onEscClick(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
  instance.show(imageSource);
}

function onImageClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const imageSource = evt.target.dataset.source;
  showImage(imageSource);
}
