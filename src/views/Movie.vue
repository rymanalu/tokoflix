<template>
  <app-content :title="title">
    <ol class="breadcrumb" slot="breadcrumb">
      <li>
        <router-link :to="{name: 'home', query: {page: 1}}">
          <i class="fa fa-film fa-fw"></i> Beranda
        </router-link>
      </li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="box box-success" :class="{'loading-box-height': !movie}">
      <div class="box-body">
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <div class="col-md-4" v-if="movie">
                <poster :src="movie.poster_url" :alt="movie.title" klass="col-sm-12" style="background: #fff;" />
                <p v-if="isMoviePurchased(movie.id)" align="center">
                  You have purchased this movie
                </p>
                <button
                  v-else
                  type="button"
                  @click="buyMovie(movie)"
                  :disabled="! canBuyMovie(movie)"
                  class="btn btn-danger btn-block col-sm-12"
                >
                  <i class="fa fa-shopping-cart fa-fw"></i>&nbsp;
                  Beli ({{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }})
                </button>
              </div>
              <div class="col-md-8" v-if="movie">
                <badge color="red">
                  <i class="fa fa-star fa-fw"></i> {{ movie.vote_average }}/10&nbsp;
                  <i class="fa fa-users fa-fw"></i> {{ movie.vote_count }}
                </badge>&nbsp;
                <badge color="green">
                  <i class="fa fa-clock-o fa-fw"></i> {{ movie.runtime }} menit
                </badge>&nbsp;
                <badge color="yellow">
                  <i class="fa fa-calendar fa-fw"></i> {{ releaseDate(movie.release_date) }}
                </badge>&nbsp;
                <badge color="blue" v-if="movie.adult">
                  <i class="fa fa-user fa-fw"></i> Dewasa
                </badge>
                <dl>
                  <br>
                  <dd>{{ movie.overview }}</dd>
                  <br>
                  <dt>Jenis Film</dt>
                  <dd>{{ genres() }}</dd>
                  <br>
                  <dt>Pemeran</dt>
                  <dd>
                    {{ credits() }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="row" v-if="reviews.length">
            <div class="col-md-12">
              <h4 class="col-md-12">Ulasan</h4>
              <p v-for="review in reviews" :key="review.id" class="col-md-12">
                <i>"{{ review.content }}"</i> - <b>{{ review.author }}</b>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-3" v-if="similar.length || recommendations.length">
          <right-bar-movie title="Serupa" :movies="similar" v-if="similar.length" />
          <right-bar-movie title="Rekomendasi" :movies="recommendations" v-if="recommendations.length" />
        </div>
      </div>
      <loading-spin v-show="!movie" />
    </div>
  </app-content>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import {mapGetters, mapActions} from 'vuex'

import Badge from '@/components/Badge'
import Movie from '@/components/Movie'
import Poster from '@/components/Poster'
import {isPurchased} from '@/common/utils'
import AppContent from '@/components/AppContent'
import LoadingSpin from '@/components/LoadingSpin'
import RightBarMovie from '@/components/RightBarMovie'
import {
  BUY_MOVIE,
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_REVIEWS,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS
} from '@/store/actions.type'

export default {
  components: {
    Badge,
    Movie,
    Poster,
    AppContent,
    LoadingSpin,
    RightBarMovie
  },
  computed: {
    title () {
      return this.movie ? this.movie.original_title : ''
    },
    ...mapGetters([
      'casts',
      'movie',
      'balance',
      'reviews',
      'similar',
      'purchasedMovies',
      'recommendations'
    ])
  },
  created () {
    this.fetchResources(this.movieId)
  },
  methods: {
    credits () {
      const casts = _.map(this.casts, 'name')

      return _.join(casts, ', ')
    },
    genres () {
      const genres = _.map(this.movie.genres, 'name')

      return _.join(genres, ', ')
    },
    canBuyMovie (movie) {
      return this.balance >= movie.price
    },
    ...mapActions({buyMovie: BUY_MOVIE}),
    isMoviePurchased (movieId) {
      return isPurchased(this.purchasedMovies, movieId)
    },
    fetchResources (movieId) {
      this.$store.dispatch(FETCH_CASTS, movieId)
      this.$store.dispatch(FETCH_MOVIE, movieId)
      this.$store.dispatch(FETCH_REVIEWS, movieId)
      this.$store.dispatch(FETCH_SIMILAR_MOVIES, movieId)
      this.$store.dispatch(FETCH_RECOMMENDATIONS, movieId)
    },
    releaseDate (date) {
      return moment(date).format('DD MMM YYYY')
    }
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
.loading-box-height {
  height: 100px;
}
</style>
