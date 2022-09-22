import { API_KEY, URL } from "./const";

function getAPIiUrlParams(searchParam) {
  return fetch(
    `${URL}${API_KEY}&q=${searchParam}&image_type=photo&orientation=horizontal&safesearch=true`
  );
}
export { getAPIiUrlParams };