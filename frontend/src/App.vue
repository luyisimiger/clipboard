<template>
  <v-app>
    <AppNavigationDrawer v-model="drawer" />

    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Clipboard</v-toolbar-title>

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

      <v-btn text :loading="false" @click="onCreate"> <!-- TODO: eliminar comentario :to="{ name: 'clipboard' }" -->
        <v-icon>mdi-clipboard-text-outline</v-icon>
        <span class="mr-2">New</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view>
        <Home />
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import AppNavigationDrawer from "./components/AppNavigationDrawer";
import ClipboardService from "./services/ClipboardService";

export default {
  name: "App",

  components: {
    Home,
    AppNavigationDrawer
  },

  data: () => ({
    drawer: true
  }),

  methods: {
    onCreate() {
      let clipboard = ClipboardService.create();
      this.$router.push({ name: 'clipboard', params: { uuid: clipboard.uuid, text: clipboard.text } });
    }
  }
};
</script>
