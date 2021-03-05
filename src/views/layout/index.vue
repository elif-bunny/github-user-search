<template>
  <v-app dark>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      {{ $t("title") }}
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer app>
      <span>{{ $t("title") }} &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'layout'
}
</script>
