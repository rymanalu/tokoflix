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
        <movie-list />
      </div>
      <div class="box-footer clearfix">
        <ul class="pagination pagination-sm no-margin pull-right">
          <li
            :key="page"
            @click="changePage(page)"
            v-for="page in totalPagesNowPlayingMovies"
            :class="{active: page == currentPageNowPlayingMovies}"
          >
            <router-link :to="{name: 'home', query: {page}, params: {page}}">
              {{ page }}
            </router-link>
          </li>
        </ul>
      </div>
      <loading-spin v-show="isNowPlayingMoviesLoading" />
    </div>
  </app-content>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import MovieList from '@/components/MovieList'
import AppContent from '@/components/AppContent'
import LoadingSpin from '@/components/LoadingSpin'
import {FETCH_NOW_PLAYING} from '@/store/actions.type'

export default {
  beforeRouteUpdate (to, from, next) {
    const page = to.query.page ? to.query.page : 1
    this[FETCH_NOW_PLAYING](page)
    next()
  },
  components: {
    MovieList,
    AppContent,
    LoadingSpin
  },
  computed: {
    title () {
      return 'Beranda'
    },
    ...mapGetters([
      'isNowPlayingMoviesLoading',
      'totalPagesNowPlayingMovies',
      'currentPageNowPlayingMovies'
    ])
  },
  created () {
    const page = this.$route.query.page
      ? this.$route.query.page
      : this.currentPageNowPlayingMovies

    this[FETCH_NOW_PLAYING](page)
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
