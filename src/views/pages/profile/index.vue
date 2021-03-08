<template>
  <div>
    {{ 100 }}
  </div>
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
    ...mapActions("github", [
      "getUser",
      "setLoading",
    ]),

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
      console.log('open user link')
    },
  },

  mounted() {
    this.loadUser();
  },
};
</script>
