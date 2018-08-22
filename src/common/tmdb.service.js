import {get} from './http'
import Config from '@/config'

export function fetchCasts (id) {
  return get(movieDbUrl(`movie/${id}/credits`))
}

export function fetchMovie (id) {
  return get(movieDbUrl(`movie/${id}`))
}

export function fetchSimilarMovies (id) {
  return get(movieDbUrl(`movie/${id}/similar`))
}

export function fetchRecommendations (id) {
  return get(movieDbUrl(`movie/${id}/recommendations`))
}

export function fetchNowPlaying (page = 1, region = 'US') {
  return get(movieDbUrl('movie/now_playing'), {page, region})
}

function movieDbUrl (url) {
  return `${Config.MOVIE_DB_BASE_URL}/${url}?api_key=${Config.MOVIE_DB_API_KEY}`
}
