import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAPIiUrlParams } from './fetch';
let inputVal;
const axios = require('axios').default;

const formEl = document.querySelector('#search-form');
formEl.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const {
    elements: [input],
  } = event.target;
  getAPIiUrlParams(input.value)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.dir({ data });
      const { total, hits } = data;
      console.log(hits);
      if (hits) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
          );
          const [
            downloads,
            comments,
            views,
            likes,
            tags,
            largeImageURL,
            webformatURL,
          ] = hits;
          hits.map(() => { console.log(tags, likes, views); })
      }
    })
    .catch(error => {
      console.log(error);
    });
}
