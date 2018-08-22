import Config from '@/config'

export function getMovieDbImageUrl (path, size = 154) {
  if (path) {
    return `${Config.MOVIE_DB_IMG_URL}/w${size}${path}`
  }

  return 'https://via.placeholder.com/154x231'
}

export function getMoviePriceByRating (rating) {
  if (rating <= 10 && rating >= 8) {
    return 21250
  }

  if (rating < 8 && rating >= 6) {
    return 16350
  }

  if (rating < 6 && rating >= 3) {
    return 8250
  }

  return 3500
}
