<template>
  <v-card class="mx-auto" max-width="1000" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4" v-if="user.name !== null">
          {{ user.name }}
        </div>
        <v-list-item-title class="headline mb-1">
          <a :href="user.html_url" target="_blank">{{ user.login }}</a>
        </v-list-item-title>
        <div style="height: 5px"></div>
        <v-list-item-subtitle v-if="user.bio !== null">
          {{ user.bio }}
        </v-list-item-subtitle>
        <v-list-item-content> </v-list-item-content>
        <v-list-item-content>
          {{ user.followers }} followers, {{ user.following }} following
        </v-list-item-content>
        <v-list-item-content>
          {{ user.public_repos }} public repositories,
          {{ user.public_gists }} public gists
        </v-list-item-content>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey">
        <v-img :src="user.avatar_url"> </v-img>
      </v-list-item-avatar>
    </v-list-item>
    <a
      :href="user.url"
      class="d-flex mr-3 mb-5"
      style="justify-content: flex-end"
      target="_blank"
      >API</a
    >
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "profile",

  computed: {
    ...mapState({
      loading: (state) => state.github.isLoading,
      user: (state) => state.github.user,
    }),
  },

  methods: {
    ...mapActions("github", ["getUser", "setLoading"]),

    async loadUser() {
      try {
        // maybe progress bar
        this.setLoading(true);

        // start fetching from github api
        await this.getUser(this.$route.params.login);
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoading(false);
      }
    },

    openUserLink() {
      console.log("open user link");
    },
  },

  mounted() {
    this.loadUser();
  },
};
</script>
