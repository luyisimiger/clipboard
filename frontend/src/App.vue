<template>
  <v-app>
    <AppNavigationDrawer v-model="drawer" />

    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">
        <v-btn text :to="{ name: 'Home' }">Clipboard</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          :to="{ name: 'Home' }"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text :loading="loading" @click="onCreate">
        <v-icon>mdi-clipboard-text-outline</v-icon>
        <span class="mr-2">New</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view>
        <Home />
      </router-view>
    </v-main>

    <v-footer dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>
            Made with
            <v-icon color="red">mdi-heart</v-icon>from
          </strong>
          <span title="Colombia">🇨🇴</span>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import AppNavigationDrawer from "./components/AppNavigationDrawer";
import service from "./services/ClipboardService";

export default {
  name: "App",

  components: {
    Home,
    AppNavigationDrawer
  },

  data: () => ({
    drawer: false,
    loading: false
  }),

  methods: {
    onCreate() {
      let that = this;
      this.loading = true;
      service
        .create()
        .then(response => {
          that.$router.push({
            name: "clipboard",
            params: {
              uuid: response.data.uuid,
              text: response.data.text,
              require_fetch: false
            }
          });
        })
        .catch(() => {
          // codigo aqui
        })
        .then(() => (that.loading = false));
    }
  }
};
</script>
