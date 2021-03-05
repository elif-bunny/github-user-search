<template>
  <div>
    <h1>
      {{ $t('page-not-found') }}
    </h1>
    <router-link to="/"> Home page </router-link>
  </div>
</template>

<script>
export default {
  name: 'page404',
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
