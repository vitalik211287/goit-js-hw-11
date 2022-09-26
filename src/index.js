import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { cleanerEl, renderGalleryList } from './render';
import NewApiServece from './fetch';

const onSearch = document.querySelector('#search-form');
const onLoadMore = document.querySelector('.load-more');
const newApiServece = new NewApiServece();

onSearch.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  newApiServece.query = event.currentTarget.elements.searchQuery.value;
  newApiServece.resetPage();
  cleanerEl();
  newApiServece
    .fetchGallery()
    .then(({ data }) => {
      if (data.hits.length === 0) {
        cleanerEl();
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      Notify.info(`Hooray! We found ${data.total} images.`);

      renderGalleryList(data.hits);
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong...`);
      console.error(error);
    });
  // divOnLoadMore.append('onLoadMore');
  onLoadMore.style.visibility = 'visible';
}

// onLoadMore.remove();
onLoadMore.style.visibility = 'hidden';
onLoadMore.addEventListener('click', event => {
  event.preventDefault();
  newApiServece
    .fetchGallery()
    .then(({ data }) => {
      if (data.hits.length === 0) {
        cleanerEl();
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.totalHits === newApiServece.page) {
        Notify.info(
          'We`re sorry, but you`ve reached the end of search results.'
        );
      }
      console.log(newApiServece.query);
      renderGalleryList(data.hits);
    })
    .catch(error => {
      console.log(error);
    });
});
