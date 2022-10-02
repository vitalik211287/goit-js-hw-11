import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { cleanerEl, renderGalleryList } from './render';
import NewApiServece from './fetch';

const onSearch = document.querySelector('#search-form');
const onLoadMore = document.querySelector('.load-more');
const newApiServece = new NewApiServece();

onSearch.addEventListener('submit', submitHandler);
buttonHidden();

async function submitHandler(event) {
  event.preventDefault();

  const inputValue = event.currentTarget.elements.searchQuery.value;
  if (!inputValue) {
    return;
  }
  newApiServece.query = inputValue;

  newApiServece.resetPage();
  cleanerEl();
  try {
    const { data } = await newApiServece.fetchGallery();
    if (data.hits.length === 0) {
      cleanerEl();
      buttonHidden();
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    Notify.info(`Hooray! We found ${data.total} images.`);
    renderGalleryList(data.hits);
    buttonVisible();
    newApiServece.page += 1;

    if (
      data.totalHits === newApiServece.page * newApiServece.per_page       
    ) {
      buttonHidden();
      return;
    }
  } catch (error) {
    Notify.failure(`Oops! Something went wrong...`);
    console.error(error);
  }
}

onLoadMore.addEventListener('click', async event => {
  event.preventDefault();
  buttonHidden();
  try {
    const { data } = await newApiServece.fetchGallery();
    if (newApiServece.page * newApiServece.per_page >= data.totalHits) {
      Notify.info('We`re sorry, but you`ve reached the end of search results.');
      renderGalleryList(data.hits);
      return;
    }

    renderGalleryList(data.hits);
    buttonVisible();
    newApiServece.page += 1;
  } catch (error) {
    Notify.failure(`Oops! Something went wrong...`);
    console.error(error);
  }
});

function buttonVisible() {
  onLoadMore.style.visibility = 'visible';
}
function buttonHidden() {
  onLoadMore.style.visibility = 'hidden';
}
