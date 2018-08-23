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

    <div class="box box-success" :class="{'loading-detail': !movieDetail}">
      <div class="box-body">
        <div class="col-md-3" v-if="movieDetail">
          <poster :src="movieDetail.poster_url" :alt="movieDetail.title" klass="col-sm-12" style="background: #fff;" />
          <button
            type="button"
            @click="buyMovie(movieDetail)"
            :disabled="! canBuyMovie(movieDetail)"
            v-if="! isMoviePurchased(movieDetail.id)"
            class="btn btn-danger btn-block col-sm-12"
          >
            <i class="fa fa-shopping-cart fa-fw"></i>&nbsp;
            Beli ({{ movieDetail.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }})
          </button>
          <p v-else align="center">You have purchased this movie</p>
        </div>
        <div class="col-md-6" v-if="movieDetail">
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
            <movie klass="col-sm-12" :movie="movie" v-for="movie in similar" :key="movie.id" />
          </template>
          <template v-if="recommendations.length > 0">
            <h4>Rekomendasi</h4>
            <movie klass="col-sm-12" :movie="movie" v-for="movie in recommendations" :key="movie.id" />
          </template>
        </div>
      </div>
      <div class="overlay" v-show="!movieDetail">
        <i class="fa fa-refresh fa-spin"></i>
      </div>
    </div>
  </app-content>
</template>

<script>
import _ from 'lodash'
import {mapGetters, mapActions} from 'vuex'

import Movie from '@/components/Movie'
import Poster from '@/components/Poster'
import {isPurchased} from '@/common/utils'
import AppContent from '@/components/AppContent'
import {
  BUY_MOVIE,
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS
} from '@/store/actions.type'

export default {
  components: {
    Movie,
    Poster,
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
      'purchasedMovies',
      'recommendations'
    ]),
    ...mapGetters({
      movieDetail: 'movie'
    })
  },
  created () {
    this.fetchResources(this.movieId)
  },
  methods: {
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
      this.$store.dispatch(FETCH_SIMILAR_MOVIES, movieId)
      this.$store.dispatch(FETCH_RECOMMENDATIONS, movieId)
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
.loading-detail {
  height: 100px;
}
</style>
