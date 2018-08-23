<template>
  <div>
    <div class="col-md-12" v-for="(chunkedMovies, index) in movieList" :key="index">
      <movie klass="col-md-3" :movie="movie" v-for="movie in chunkedMovies" :key="movie.id" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Movie from './Movie'

export default {
  components: {
    Movie
  },
  computed: {
    ...mapGetters({
      movieList: 'nowPlayingMovies'
    })
  }
}
</script>
