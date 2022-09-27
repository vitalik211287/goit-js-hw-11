import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { cleanerEl, renderGalleryList } from './render';
import NewApiServece from './fetch';

const onSearch = document.querySelector('#search-form');
const onLoadMore = document.querySelector('.load-more');
const newApiServece = new NewApiServece();

onSearch.addEventListener('submit', submitHandler);
onLoadMore.style.visibility = 'hidden';

async function submitHandler(event) {
  event.preventDefault();
  onLoadMore.style.visibility = 'hidden';
  const inputValue = event.currentTarget.elements.searchQuery.value
  if(!inputValue){
    return
  }
  newApiServece.query = inputValue;
  newApiServece.resetPage();
  cleanerEl();
  try {
    const { data } = await newApiServece.fetchGallery();

    if (data.hits.length === 0) {
      cleanerEl();
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    //   if (data.totalHits === newApiServece.page * newApiServece.per_page) {
    //   Notify.info('We`re sorry, but you`ve reached the end of search results.');

    // }
   
    Notify.info(`Hooray! We found ${data.total} images.`);
    renderGalleryList(data.hits);
    onLoadMore.style.visibility = 'visible';
  } catch (error) {
    Notify.failure(`Oops! Something went wrong...`);
    console.error(error);
  }
}



onLoadMore.addEventListener('click', async event => {
  event.preventDefault();
  try {
    const { data } = await newApiServece.fetchGallery();
    if (data.hits.length === 0) {
      cleanerEl();
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (data.totalHits === newApiServece.page * newApiServece.per_page) {
      Notify.info('We`re sorry, but you`ve reached the end of search results.');
    }
   
    renderGalleryList(data.hits);
  } catch (error) {
    Notify.failure(`Oops! Something went wrong...`);
    console.error(error);
  }
});
