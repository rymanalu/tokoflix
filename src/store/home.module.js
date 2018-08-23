import _ from 'lodash'

import {RESET_HOME, FETCH_NOW_PLAYING} from './actions.type'
import {fetchNowPlaying} from '@/common/tmdb.service'
import {addMovieAttributes} from '@/common/utils'
import {
  LOADING_NOW_PLAYING_END,
  LOADING_NOW_PLAYING_START,
  SET_NOW_PLAYING,
  RESET_HOME_STATE,
  SET_PAGE
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
  },
  [RESET_HOME] ({commit}) {
    commit(RESET_HOME_STATE)
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
    state.nowPlayingMovies = _.chunk(data.results.map(addMovieAttributes), 4)
    state.currentPageNowPlayingMovies = data.page
    state.totalPagesNowPlayingMovies = data.total_pages
  },
  [RESET_HOME_STATE] (state) {
    state.currentPageNowPlayingMovies = 1
  },
  [SET_PAGE] (state, page) {
    state.currentPageNowPlayingMovies = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
