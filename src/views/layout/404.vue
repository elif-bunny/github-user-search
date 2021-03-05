<template>
  <v-app dark>
    <h1>
      {{ $t('page-not-found') }}
    </h1>
    <router-link to="/"> Home page </router-link>
  </v-app>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {
      pageNotFound: '404 Not Found'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
