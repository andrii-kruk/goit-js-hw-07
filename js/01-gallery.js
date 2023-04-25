import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  galleryList: document.querySelector(".gallery"),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

refs.galleryList.addEventListener("click", onGalleryImageClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a class="gallery__link" href="${preview}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function onGalleryImageClick(event) {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${event.target.dataset.source}" width="800" height="600">
`);
  instance.show();

  refs.galleryList.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      instance.close();
    }
  });
}
