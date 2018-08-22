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
            <router-link :to="{ name: 'movie', params: {slug: nowPlayingMovie.slug, movie: nowPlayingMovie} }">
              <span class="purchased">Purchased</span>
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
            <router-link :to="{ name: 'home', query: {page} }">{{ page }}</router-link>
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
import {mapActions, mapGetters} from 'vuex'

import AppContent from '@/components/AppContent'
import {FETCH_NOW_PLAYING} from '@/store/actions.type'

export default {
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
      'currentPageNowPlayingMovies'
    ])
  },
  created () {
    this[FETCH_NOW_PLAYING](this.currentPageNowPlayingMovies)
  },
  methods: {
    ...mapActions([
      FETCH_NOW_PLAYING
    ]),
    changePage (page) {
      this[FETCH_NOW_PLAYING](page)
    }
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
