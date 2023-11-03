// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

console.log(galleryItems);

function createGalleryItem(items) {
    return items.map(({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            />
        </a>
    </li>`
    ).join('')
}
const galleryMarkup = createGalleryItem(galleryItems);

// Get gallery list
const galleryList = document.querySelector('.gallery')

// Print galery
galleryList.insertAdjacentHTML('afterbegin', galleryMarkup);

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});