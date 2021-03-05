<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <div>hello</div>
      </v-container>
    </v-main>
    <v-footer app>
      <span>{{ title }} &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'RobDev',
    }
  },
}
</script>
