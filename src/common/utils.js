import slugify from 'slugify'

import Config from '@/config'

export function isPurchased (purchasedMovies, movieId) {
  return purchasedMovies.find(movie => movie === movieId) !== undefined
}

export function getMovieDbImageUrl (path, size = 154) {
  if (path) {
    return `${Config.MOVIE_DB_IMG_URL}/w${size}${path}`
  }

  return 'https://via.placeholder.com/154x231'
}

export function addMovieAttributes (movie) {
  movie.slug = `${movie.id}-${slugify(movie.title)}`
  movie.price = getMoviePriceByRating(movie.vote_average)
  movie.poster_url = getMovieDbImageUrl(movie.poster_path, 154)

  return movie
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
