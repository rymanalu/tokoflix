import {BUY_MOVIE} from './actions.type'
import {USE_BALANCE, ADD_TO_PURCHASED_MOVIES} from './mutations.type'

const state = {
  balance: 100000,
  purchasedMovies: []
}

const getters = {
  balance (state) {
    return state.balance
  },
  purchasedMovies (state) {
    return state.purchasedMovies
  }
}

const actions = {
  [BUY_MOVIE] ({commit}, movie) {
    commit(USE_BALANCE, movie.price)
    commit(ADD_TO_PURCHASED_MOVIES, movie.id)
  }
}

const mutations = {
  [USE_BALANCE] (state, amount) {
    state.balance = state.balance - amount
  },
  [ADD_TO_PURCHASED_MOVIES] (state, movieId) {
    state.purchasedMovies.push(movieId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
