import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { getAPIiUrlParams } from './fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const galleryEl = document.querySelector(".gallery");

function renderGalleryList(hits) {
     console.log(hits );
      const addedElString = hits
        .map(
          ({
            downloads,
            comments,
            views,
            likes,
            tags,
            webformatURL,
            largeImageURL,
          }) => {
                return `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
       <span class="span_text">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
        <span class="span_text">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
       <span class="span_text">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
       <span class="span_text">${downloads}</span>
    </p>
  </div>
</div>`;
          }
        )
        .join(' ');
    galleryEl.insertAdjacentHTML('beforeend', addedElString);

 new SimpleLightbox('.gallery a.gallery__item', {
    captionDelay: '250',
 });
 
}
 
function cleanerEl() {
   galleryEl.innerHTML = '';  
}

    
    
// function galleryRenderEl() {
//     getAPIiUrlParams()
//         .then(data => {
//             console.log(data);
//             const { total, totalHits, hits } = data;
//             console.log(hits);
//             if (hits.length === 0) {
//                 cleanerEl();
//                 Notify.info(
//                     'Sorry, there are no images matching your search query. Please try again.'
//                 );
//             }
//             renderGalleryList(hits);
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }
export { renderGalleryList, cleanerEl,galleryRenderEl }; 
