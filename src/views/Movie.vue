<template>
  <app-content :title="title">
    <ol class="breadcrumb" slot="breadcrumb">
      <li><router-link :to="{ name: 'home' }"><i class="fa fa-film fa-fw"></i> Beranda</router-link></li>
      <li class="active">{{ title }}</li>
    </ol>

    <div class="col-md-3">
      <img :src="movie.poster_url" :alt="movie.title" class="col-sm-12" style="background: #fff;">
      <button type="button" class="btn btn-danger btn-block col-sm-12">Beli</button>
    </div>
    <div class="col-md-6">
      <dl v-if="movieDetail">
        <dt>Rating</dt>
        <dd>{{ movieDetail.vote_average }}</dd>

        <dt>Casts</dt>
        <dd>
          <li v-for="cast in casts" :key="cast.id">{{ cast.name }}</li>
        </dd>

        <dt>Durasi</dt>
        <dd>{{ movieDetail.runtime }}</dd>

        <dt>Harga</dt>
        <dd>{{ movieDetail.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</dd>

        <dt>Overview</dt>
        <dd>{{ movieDetail.overview }}</dd>
      </dl>
    </div>
    <div class="col-md-3" v-show="similar.length && recommendations.length">
      <h4>Similar</h4>
      <div class="col-sm-12 movie-item" v-for="movie in similar" :key="movie.id">
        <router-link :to="{ name: 'movie', params: {slug: movie.slug, movie} }">
          <span class="purchased">Purchased</span>
          <img :src="movie.poster_url" :alt="movie.title">
        </router-link>
        <p><b>{{ movie.title }}</b></p>
        <p><i>{{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
      </div>
      <h4>Recommendations</h4>
      <div class="col-sm-12 movie-item" v-for="movie in recommendations" :key="movie.id">
        <router-link :to="{ name: 'movie', params: {slug: movie.slug, movie} }">
          <span class="purchased">Purchased</span>
          <img :src="movie.poster_url" :alt="movie.title">
        </router-link>
        <p><b>{{ movie.title }}</b></p>
        <p><i>{{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
      </div>
    </div>
  </app-content>
</template>

<script>
import {mapGetters} from 'vuex'

import AppContent from '@/components/AppContent'
import {
  FETCH_CASTS,
  FETCH_MOVIE,
  FETCH_SIMILAR_MOVIES,
  FETCH_RECOMMENDATIONS
} from '@/store/actions.type'

export default {
  components: {
    AppContent
  },
  computed: {
    title () {
      return this.movie.title
    },
    ...mapGetters([
      'casts',
      'similar',
      'recommendations'
    ]),
    ...mapGetters({
      movieDetail: 'movie'
    })
  },
  created () {
    this.fetchResources(this.movie)
  },
  methods: {
    fetchResources(movie) {
      this.$store.dispatch(FETCH_CASTS, movie.id)
      this.$store.dispatch(FETCH_MOVIE, movie.id)
      this.$store.dispatch(FETCH_SIMILAR_MOVIES, movie.id)
      this.$store.dispatch(FETCH_RECOMMENDATIONS, movie.id)
    }
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  watch: {
    movie (newMovie) {
      this.fetchResources(newMovie)
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
