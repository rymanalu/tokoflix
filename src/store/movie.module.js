import _ from 'lodash'
import slugify from 'slugify'

import {
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS
} from './actions.type'
import {
  getMovieDbImageUrl,
  getMoviePriceByRating
} from '@/common/utils'
import {
  SET_CASTS,
  SET_MOVIE,
  RESET_CASTS,
  RESET_MOVIE,
  SET_SIMILAR_MOVIES,
  SET_RECOMMENDATIONS,
  RESET_SIMILAR_MOVIES,
  RESET_RECOMMENDATIONS
} from './mutations.type'
import {
  fetchCasts,
  fetchMovie,
  fetchSimilarMovies,
  fetchRecommendations
} from '@/common/tmdb.service'

const state = {
  casts: [],
  movie: null,
  similar: [],
  recommendations: []
}

const getters = {
  casts (state) {
    return state.casts
  },
  movie (state) {
    return state.movie
  },
  similar (state) {
    return state.similar
  },
  recommendations (state) {
    return state.recommendations
  }
}

const actions = {
  [FETCH_CASTS] ({commit}, id) {
    commit(RESET_CASTS)

    fetchCasts(id)
      .then(({data}) => {
        commit(SET_CASTS, data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  [FETCH_MOVIE] ({commit}, id) {
    commit(RESET_MOVIE)

    fetchMovie(id)
      .then(({data}) => {
        commit(SET_MOVIE, data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  [FETCH_SIMILAR_MOVIES] ({commit}, id) {
    commit(RESET_SIMILAR_MOVIES)

    fetchSimilarMovies(id)
      .then(({data}) => {
        commit(SET_SIMILAR_MOVIES, data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  [FETCH_RECOMMENDATIONS] ({commit}, id) {
    commit(RESET_RECOMMENDATIONS)

    fetchRecommendations(id)
      .then(({data}) => {
        commit(SET_RECOMMENDATIONS, data)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [SET_MOVIE] (state, data) {
    data.price = getMoviePriceByRating(data.vote_average)
    data.poster_url = getMovieDbImageUrl(data.poster_path, 154)

    state.movie = data
  },
  [SET_CASTS] (state, {cast}) {
    state.casts = cast
  },
  [RESET_CASTS] (state) {
    state.casts = []
  },
  [RESET_MOVIE] (state) {
    state.movie = null
  },
  [SET_SIMILAR_MOVIES] (state, {results}) {
    const similar = _.slice(results, 0, 3)

    state.similar = similar.map(movie => {
      movie.slug = `${movie.id}-${slugify(movie.title)}`
      movie.price = getMoviePriceByRating(movie.vote_average)
      movie.poster_url = getMovieDbImageUrl(movie.poster_path, 154)

      return movie
    })
  },
  [RESET_SIMILAR_MOVIES] (state) {
    state.similar = []
  },
  [SET_RECOMMENDATIONS] (state, {results}) {
    const recommendations = _.slice(results, 0, 3)

    state.recommendations = recommendations.map(movie => {
      movie.slug = `${movie.id}-${slugify(movie.title)}`
      movie.price = getMoviePriceByRating(movie.vote_average)
      movie.poster_url = getMovieDbImageUrl(movie.poster_path, 154)

      return movie
    })
  },
  [RESET_RECOMMENDATIONS] (state) {
    state.recommendations = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
