import { API_KEY, URL } from './constants';
const axios = require('axios').default;
//
// export default function fetchGallery(name) {
//   const url = `${URL}${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=10&per_page=40`;
//   return axios.get(url);
// }

export default class NewApiServece {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchGallery() {
    const url = `${URL}${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=42`;
    this.page += 1;
    return axios.get(url);
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
