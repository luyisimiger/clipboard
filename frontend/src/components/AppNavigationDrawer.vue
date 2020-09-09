<template>
  <v-navigation-drawer
    v-model="drawer1"
    fixed
    app
    clipped
    absolute
    temporary
    class="drawer-style"
    @input="onToogle"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>John Doe</v-list-item-title>

      <v-btn icon @click.stop="onToogle(!drawer1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-lightbulb-on</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>I have an idea</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  model: {
    prop: "drawer",
    event: "change"
  },

  props: {
    drawer: Boolean
  },

  data() {
    return {
      drawer1: this.drawer
    };
  },

  watch: {
    drawer() {
      this.drawer1 = this.drawer;
    }
  },

  methods: {
    onToogle(value) {
      this.$emit("change", value);
    }
  }
};
</script>
