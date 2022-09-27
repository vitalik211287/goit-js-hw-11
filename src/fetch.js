import { API_KEY, URL } from './constants';
const axios = require('axios').default;
//
// export default function fetchGallery(name) {
//   const url = `${URL}${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=10&per_page=40`;
//   return axios.get(url);
// }

export default class NewApiServece {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
    this.per_page = 42
  }
  fetchGallery() {
    const url = `${URL}${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
    this.page += 1;
    return axios.get(url);
  }
  resetPage() {
    this.page = 1;
  }

  // checkLastPage() {if (data.totalHits === newApiServece.page * newApiServece.per_page) }

  get query() {
    return this._searchQuery;
  }

  set query(newQuery) {
    return (this._searchQuery = newQuery);
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
  
}
