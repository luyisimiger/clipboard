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
        >{{ text }}</v-textarea
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
import service from "../services/ClipboardService";

export default {
  name: "Clipboard",

  props: {
    uuid: String,
    text: String,
    require_fetch: {
      type: Boolean,
      default: true,
      required: false
    }
  },

  data() {
    return {
      fab: false,
      browserfingerprint: "",
      synchronizing: false,
      xrequire_fetch: this.require_fetch,
      clipboard: {
        uuid: this.uuid,
        text: this.text
      }
    };
  },

  created() {
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

  mounted() {
    //let that = this;
    //let mykey = service.key(this.clipboard.uuid);
    //window.addEventListener("storage", event => {
    //  if (event.key == mykey) {
    //    that.clipboard = JSON.parse(event.newValue);
    //  }
    //});

    this.dofetch();
  },

  methods: {

    dofetch() {
      if (this.xrequire_fetch)
        this.fetch();
    },

    fetch() {
      service.fetch(this.uuid).then(response => {
        if (response.data != null) {
          this.clipboard = response.data;
        }
      });
    },

    onClipInput() {
      // Se llama cada vez que se tipea en el textarea
    },

    onSave() {
      let payload = {
        browserfingerprint: this.browserfingerprint,
        clipboard: this.clipboard
      };

      if (!this.synchronizing) {
        this.synchronizing = true;
        service
          .save(payload)
          .then(() => console.log("save"))
          .catch(error => console.log(error))
          .then(() => (this.synchronizing = false));
      }
    },

    onDelete() {
      service.delete(this.uuid).then(() => {
        // router navigation
      });
    }
  },

  watch: {
    '$route': function(a) {
      this.uuid = a.params.uuid;
      this.xrequire_fetch = a.params.require_fetch;
      this.xrequire_fetch = this.xrequire_fetch === undefined ? true : this.xrequire_fetch;
      
      this.dofetch();
    }
  },

  beforeDestroy() {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
  },

  beforeRouteUpdate(to, from, next) {
    let clip = {
      uuid: to.params.uuid,
      text: to.params.text
    };
    this.clipboard = clip;
    next();
  }
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
