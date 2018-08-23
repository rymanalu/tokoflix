<template>
  <app-content :title="title">
    <ol class="breadcrumb" slot="breadcrumb">
      <li><i class="fa fa-home fa-fw"></i> {{ title }}</li>
    </ol>

    <div class="box box-success">
      <div class="box-header with-border">
        <h3 class="box-title">Sedang Tayang</h3>
      </div>
      <div class="box-body">
        <div v-for="(nowPlayingMoviesChunk, index) in nowPlayingMovies" class="col-md-12" :key="index">
          <div v-for="nowPlayingMovie in nowPlayingMoviesChunk" class="col-md-3 movie-item" :key="nowPlayingMovie.id">
            <router-link :to="{ name: 'movie', params: {slug: nowPlayingMovie.slug, movieId: nowPlayingMovie.id} }">
              <span class="purchased" v-if="isMoviePurchased(nowPlayingMovie.id)">Purchased</span>
              <img :src="nowPlayingMovie.poster_url" :alt="nowPlayingMovie.title">
            </router-link>
            <p><b>{{ nowPlayingMovie.title }}</b></p>
            <p><i>{{ nowPlayingMovie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
          </div>
        </div>
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right">
          <li v-for="page in totalPagesNowPlayingMovies" :key="page" :class="{active: page == currentPageNowPlayingMovies}" @click="changePage(page)">
            <router-link :to="{ name: 'home', query: {page}, params: {page} }">{{ page }}</router-link>
          </li>
        </ul>
      </div>
      <div class="overlay" v-show="isNowPlayingMoviesLoading">
        <i class="fa fa-refresh fa-spin"></i>
      </div>
    </div>
  </app-content>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

import {isPurchased} from '@/common/utils'
import AppContent from '@/components/AppContent'
import {SET_PAGE} from '@/store/mutations.type'
import {FETCH_NOW_PLAYING} from '@/store/actions.type'

export default {
  beforeRouteUpdate (to, from, next) {
    const page = to.query.page ? to.query.page : 1
    this[FETCH_NOW_PLAYING](page)
    next()
  },
  components: {
    AppContent
  },
  computed: {
    title () {
      return 'Beranda'
    },
    ...mapGetters([
      'nowPlayingMovies',
      'isNowPlayingMoviesLoading',
      'totalPagesNowPlayingMovies',
      'currentPageNowPlayingMovies',
      'purchasedMovies'
    ])
  },
  created () {
    const page = this.$route.query.page ? this.$route.query.page : this.currentPageNowPlayingMovies
    this[FETCH_NOW_PLAYING](page)
  },
  methods: {
    isMoviePurchased (movieId) {
      return isPurchased(this.purchasedMovies, movieId)
    },
    ...mapActions([
      FETCH_NOW_PLAYING
    ]),
    changePage (page) {
      this[FETCH_NOW_PLAYING](page)
    },
    ...mapMutations([SET_PAGE])
  }
}
</script>

<style>
.movie-item .purchased {
  position: absolute;
  top: 10px;
  padding: 2px 15px;
  background: crimson;
  color: #fff
}
</style>
