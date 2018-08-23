import _ from 'lodash'

import {
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_REVIEWS,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS
} from './actions.type'
import {
  addMovieAttributes,
  getMovieDbImageUrl,
  getMoviePriceByRating
} from '@/common/utils'
import {
  SET_CASTS,
  SET_MOVIE,
  RESET_CASTS,
  RESET_MOVIE,
  SET_REVIEWS,
  RESET_REVIEWS,
  SET_SIMILAR_MOVIES,
  SET_RECOMMENDATIONS,
  RESET_SIMILAR_MOVIES,
  RESET_RECOMMENDATIONS
} from './mutations.type'
import {
  fetchCasts,
  fetchMovie,
  fetchReviews,
  fetchSimilarMovies,
  fetchRecommendations
} from '@/common/tmdb.service'

const state = {
  casts: [],
  movie: null,
  reviews: [],
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
  reviews (state) {
    return state.reviews
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
  [FETCH_REVIEWS] ({commit}, id) {
    commit(RESET_REVIEWS)

    fetchReviews(id)
      .then(({data}) => {
        commit(SET_REVIEWS, data)
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
  [SET_REVIEWS] (state, {results}) {
    state.reviews = _.slice(results, 0, 3)
  },
  [RESET_REVIEWS] (state) {
    state.reviews = []
  },
  [SET_SIMILAR_MOVIES] (state, {results}) {
    const similar = _.slice(results, 0, 3)

    state.similar = similar.map(addMovieAttributes)
  },
  [RESET_SIMILAR_MOVIES] (state) {
    state.similar = []
  },
  [SET_RECOMMENDATIONS] (state, {results}) {
    const recommendations = _.slice(results, 0, 3)

    state.recommendations = recommendations.map(addMovieAttributes)
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
