<template>
  <div>
    <v-container>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" md="3"> </v-col>
          <v-col cols="12" md="6" class="d-flex align-baseline">
            <v-text-field
              cols="12"
              sm="5"
              md="5"
              :placeholder="`${$t('search-user')}:`"
              solo
              dense
              v-model="filter.q"
              :rules="[rules.required, rules.counter]"
            >
            </v-text-field>
            <v-btn
              cols="12"
              sm="1"
              md="1"
              class="ml-2"
              @click="search()"
              :disabled="!valid"
            >
              {{ $t("search") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="3"> </v-col>
        </v-row>
        <v-row v-if="filter.total_count>0">
          <v-col>
            <div justify="center" align="center">{{filter.total_count}} results (display first 1000 results only)
              <a :href="apiURL" target="_blank" v-if="apiURL !== undefined"> Github API Link (current page)</a>
            </div>
          </v-col>
        </v-row>
      </v-form>
      <v-card style="background-color: transparent" v-if="users.length>0">
        <v-container>
          <v-item-group>
            <v-row>
              <v-col v-for="(user, idx) in users" :key="idx">
                <v-card
                  color="secondary"
                  @click="openUser(user)"
                  height="auto"
                  width="140"
                  class=""
                  tile
                >
                  <v-col
                    class="d-flex flex-column"
                    align="center"
                    justify="center"
                  >
                    <v-avatar class="profile" size="auto">
                      <v-img :src="user.avatar_url"></v-img>
                    </v-avatar>
                    <div class="mt-3">
                      {{ user.login }}
                    </div>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>
          </v-item-group>
        </v-container>
        <v-pagination
          circle
          v-model="filter.page"
          :length="pages"
          total-visible="7"
          @input="changePage"
        ></v-pagination>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "dashboard",

  computed: {
    ...mapState({
      loading: (state) => state.github.isLoading,
      filter: (state) => state.github.filter,
      users: (state) => state.github.users,
      apiURL: (state) => state.github.lastUsersURL,
      pages: (state) => {
        return Math.ceil(
          Math.min(state.github.filter.total_count, 1000) /
            state.github.filter.per_page
        );
      },
    }),
  },

  data()  {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 50 || "Max 50 characters",
      },
      valid: false,
      page: 1,
    };
  },

  methods: {
    ...mapActions("github", [
      "resetFilter",
      "getUsers",
      "setLoading",
      "setFilterOption",
    ]),

    async onSearch() {
      try {
        // reset page, total_count
        await this.resetFilter();

        // start fetching from github api
        await this.search();
      } catch (error) {
        console.log(error);
      }
    },

    async search() {
      try {
        // maybe progress bar
        this.setLoading(true);

        // start fetching from github api
        await this.getUsers();
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoading(false);
      }
    },

    async changePage(page) {
      try {
        // just update page
        await this.setFilterOption({
          option: "page",
          value: page,
        });

        // start fetching from github api
        await this.search();
      } catch (error) {
        console.log(error);
      }
    },

    openUser(user) {
      const login = user.login;
      this.$router.push({ name: "profile", params: { login } });
    },
  },

  mounted() {},
};
</script>
