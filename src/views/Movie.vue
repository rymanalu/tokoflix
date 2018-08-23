<template>
  <app-content :title="title">
    <ol class="breadcrumb" slot="breadcrumb">
      <li><router-link :to="{ name: 'home' }"><i class="fa fa-film fa-fw"></i> Beranda</router-link></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="box box-success" v-if="movieDetail">
      <div class="box-body">
        <div class="col-md-3">
          <img :src="movieDetail.poster_url" :alt="movieDetail.title" class="col-sm-12" style="background: #fff;">
          <button type="button" class="btn btn-danger btn-block col-sm-12" :disabled="! canBuyMovie(movieDetail)" v-if="! isMoviePurchased(movieDetail.id)" @click="buyMovie(movieDetail)">
            <i class="fa fa-shopping-cart fa-fw"></i>
            Beli ({{ movieDetail.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }})
          </button>
          <p v-else align="center">You have purchased this movie</p>
        </div>
        <div class="col-md-6">
          <span class="badge bg-red">
            <i class="fa fa-star fa-fw"></i> {{ movieDetail.vote_average }}&nbsp;
            <i class="fa fa-users fa-fw"></i> {{ movieDetail.vote_count }}
          </span>&nbsp;
          <span class="badge bg-green">
            <i class="fa fa-clock-o fa-fw"></i> {{ movieDetail.runtime }} menit
          </span>
          <dl v-if="movieDetail">
            <br>
            <dd>{{ movieDetail.overview }}</dd>
            <br>
            <dt>Pemeran</dt>
            <dd>
              <li v-for="cast in casts" :key="cast.id">{{ cast.name }}</li>
            </dd>
          </dl>
        </div>
        <div class="col-md-3" v-if="similar.length || recommendations.length">
          <template v-if="similar.length">
            <h4>Serupa</h4>
            <div class="col-sm-12 movie-item" v-for="movie in similar" :key="movie.id">
              <router-link :to="{ name: 'movie', params: {slug: movie.slug, movieId: movie.id} }">
                <span class="purchased" v-if="isMoviePurchased(movie.id)">Purchased</span>
                <img :src="movie.poster_url" :alt="movie.title">
              </router-link>
              <p><b>{{ movie.title }}</b></p>
              <p><i>{{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
            </div>
          </template>
          <template v-if="recommendations.length > 0">
            <h4>Rekomendasi</h4>
            <div class="col-sm-12 movie-item" v-for="movie in recommendations" :key="movie.id">
              <router-link :to="{ name: 'movie', params: {slug: movie.slug, movieId: movie.id} }">
                <span class="purchased" v-if="isMoviePurchased(movie.id)">Purchased</span>
                <img :src="movie.poster_url" :alt="movie.title">
              </router-link>
              <p><b>{{ movie.title }}</b></p>
              <p><i>{{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </app-content>
</template>

<script>
import _ from 'lodash'
import {mapGetters, mapActions} from 'vuex'

import {isPurchased} from '@/common/utils'
import AppContent from '@/components/AppContent'
import {
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS,
  BUY_MOVIE
} from '@/store/actions.type'

export default {
  components: {
    AppContent
  },
  computed: {
    title () {
      return this.movieDetail ? this.movieDetail.title : ''
    },
    ...mapGetters([
      'casts',
      'balance',
      'similar',
      'recommendations',
      'purchasedMovies'
    ]),
    ...mapGetters({
      movieDetail: 'movie'
    })
  },
  created () {
    this.fetchResources(this.movieId)
  },
  methods: {
    isMoviePurchased (movieId) {
      return isPurchased(this.purchasedMovies, movieId)
    },
    canBuyMovie (movie) {
      return this.balance >= movie.price
    },
    fetchResources (movieId) {
      this.$store.dispatch(FETCH_CASTS, movieId)
      this.$store.dispatch(FETCH_MOVIE, movieId)
      this.$store.dispatch(FETCH_SIMILAR_MOVIES, movieId)
      this.$store.dispatch(FETCH_RECOMMENDATIONS, movieId)
    },
    ...mapActions({buyMovie: BUY_MOVIE})
  },
  props: {
    movieId: {
      type: Number,
      default () {
        return parseInt(
          _.trim(
            _.split(this.$route.path, '-')[0],
            '/'
          )
        )
      }
    }
  },
  watch: {
    movieId (newMovieId) {
      this.fetchResources(newMovieId)
    }
  }
}
</script>

<style scoped>
.movie-item .purchased {
  position: absolute;
  top: 10px;
  padding: 2px 15px;
  background: crimson;
  color: #fff
}
</style>
