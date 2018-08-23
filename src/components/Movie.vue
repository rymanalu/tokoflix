<template>
  <div :class="klass">
    <router-link :to="{name: 'movie', params: {slug: movie.slug, movieId: movie.id}}">
      <span class="purchased" v-if="isPurchased(movie.id)">Purchased</span>
      <poster :src="movie.poster_url" :alt="movie.original_title" />
    </router-link>
    <p><b>{{ movie.original_title }}</b></p>
    <p><i>{{ movie.price | currency('Rp ', 0, {thousandsSeparator: '.'}) }}</i></p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Poster from '@/components/Poster'
import {isPurchased} from '@/common/utils'

export default {
  components: {
    Poster
  },
  computed: {
    ...mapGetters([
      'purchasedMovies'
    ])
  },
  methods: {
    isPurchased (movieId) {
      return isPurchased(this.purchasedMovies, movieId)
    }
  },
  props: {
    klass: {
      type: String
    },
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.purchased {
  top: 10px;
  color: #fff;
  padding: 2px 15px;
  position: absolute;
  background: crimson;
}
</style>
