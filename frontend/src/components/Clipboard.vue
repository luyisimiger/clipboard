<template>
  <v-card id="clipboard" flat>
    <v-container>
      <v-textarea
        v-model="clipboard.text"
        class="font-monaco"
        name="clip"
        placeholder="The clipboard text"
        solo
        flat
        auto-grow
        @input="onClipInput"
        >{{ clipboard.text }}</v-textarea
      >
    </v-container>
    <v-speed-dial
      v-model="fab"
      right
      top
      open-on-hover
      direction="bottom"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-clipboard</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="onSave">
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="onDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-card>
</template>

<script>
export default {
  name: "Clipboard",

  props: {
    clipboardObject: {
      type: Object,
      default: () => ({ uuid: "", text: "" }),
      required: false
    }
  },

  data() {
    return {
      fab: false,
      browserfingerprint: "",
      synchronizing: false,
      clipboard: this.clipboardObject
    };
  },

  created() {
    // get browser unique id
    this.$fingerprint.get(components => {
      this.browserfingerprint = this.$fingerprint.x64hash128(
        components
          .map(pair => {
            return pair.value;
          })
          .join(),
        31
      );
    });
  },

  mounted() {},

  methods: {
    onClipInput() {
      // Se llama cada vez que se tipea en el textarea
    },

    onSave() {
      this.$emit("save", this.clipboard);
    },

    onDelete() {
      this.$emit("delete", this.clipboard);
    }
  },

  watch: {
    clipboardObject: function() {
      this.clipboard = this.clipboardObject;
    }
  },

  beforeDestroy() {}
};
</script>

<style lang="sass">
@import url(//db.onlinewebfonts.com/c/75f171bc535016d4d2582e6f88d52796?family=Monaco)

.font-monaco
  font-family: monaco, Consolas, Lucida Console, monospace
  font-size: 23px
  font-style: normal
  font-variant: normal
  font-weight: 700
  line-height: 23px
</style>

<style>
/* This is for documentation purposes and will not be needed in your application */
#clipboard .v-speed-dial {
  position: absolute;
}

#clipboard .v-btn--floating {
  position: relative;
}
</style>
