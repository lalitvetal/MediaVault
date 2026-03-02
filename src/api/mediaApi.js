import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

const PER_PAGE = 20;

export async function fetchPhotos(query, page = 1) {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query, page, per_page: PER_PAGE },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });
  return res.data; // { results, total, total_pages }
}

export async function fetchVideos(query, page = 1) {
  const res = await axios.get('https://api.pexels.com/videos/search', {
    params: { query, per_page: PER_PAGE, page },
    headers: { Authorization: PEXELS_KEY },
  });
  return res.data; // { videos, total_results }
}

export async function fetchGif(query, page = 1) {
  const offset = (page - 1) * PER_PAGE;
  const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: { api_key: GIPHY_KEY, q: query, limit: PER_PAGE, offset },
  });
  return res.data; // { data, pagination }
}