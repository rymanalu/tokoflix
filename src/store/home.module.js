import _ from 'lodash'
import slugify from 'slugify'

import {FETCH_NOW_PLAYING} from './actions.type'
import {fetchNowPlaying} from '@/common/tmdb.service'
import {
  getMovieDbImageUrl,
  getMoviePriceByRating
} from '@/common/utils'
import {
  LOADING_NOW_PLAYING_END,
  LOADING_NOW_PLAYING_START,
  SET_NOW_PLAYING
} from './mutations.type'

const state = {
  nowPlayingMovies: [],
  totalPagesNowPlayingMovies: 0,
  currentPageNowPlayingMovies: 1,
  isNowPlayingMoviesLoading: true
}

const getters = {
  nowPlayingMovies (state) {
    return state.nowPlayingMovies
  },
  isNowPlayingMoviesLoading (state) {
    return state.isNowPlayingMoviesLoading
  },
  totalPagesNowPlayingMovies (state) {
    return state.totalPagesNowPlayingMovies
  },
  currentPageNowPlayingMovies (state) {
    return state.currentPageNowPlayingMovies
  }
}

const actions = {
  [FETCH_NOW_PLAYING] ({commit}, page) {
    commit(LOADING_NOW_PLAYING_START)
    fetchNowPlaying(page)
      .then(({data}) => {
        commit(SET_NOW_PLAYING, data)
        commit(LOADING_NOW_PLAYING_END)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [LOADING_NOW_PLAYING_END] (state) {
    state.isNowPlayingMoviesLoading = false
  },
  [LOADING_NOW_PLAYING_START] (state) {
    state.isNowPlayingMoviesLoading = true
  },
  [SET_NOW_PLAYING] (state, data) {
    state.nowPlayingMovies = _.chunk(data.results.map(movie => {
      movie.slug = `${movie.id}-${slugify(movie.title)}`
      movie.price = getMoviePriceByRating(movie.vote_average)
      movie.poster_url = getMovieDbImageUrl(movie.poster_path, 154)

      return movie
    }), 4)

    state.currentPageNowPlayingMovies = data.page
    state.totalPagesNowPlayingMovies = data.total_pages
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
