import axios from 'axios';
import { paramsForNotify } from 'components/App';
import { Notify } from 'notiflix';

const KEY = '40826699-b7bef6c2b5cf50adc3ffa0ee2';
const URL = 'https://pixabay.com/api/';

export async function searchPhoto(search, page, perPage) {
  const url = `${URL}?key=${KEY}&q=${search}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal`;
  const response = await axios.get(url);
  // console.log('response.data :>> ', response.data);
  // console.log('page :>> ', page);
  // console.log('perPage :>> ', perPage);
  return response.data;
}

export function loadPhotoError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!',
    paramsForNotify
  );
}
