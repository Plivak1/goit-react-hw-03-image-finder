import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const params = new URLSearchParams({
    key: '29559885-2c1c612397671212a1aefac6d',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
    page: page,
    per_page: 8,
  });

  const response = await axios.get(`?${params}`);
  return response.data;
};
