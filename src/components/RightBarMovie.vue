<template>
  <div>
    <h4>{{ title }}</h4>
    <movie klass="col-sm-12" :movie="movie" v-for="movie in movies" :key="movie.id" />
  </div>
</template>

<script>
import Movie from './Movie'

export default {
  components: {
    Movie
  },
  props: {
    title: {
      type: String,
      required: true
    },
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>
