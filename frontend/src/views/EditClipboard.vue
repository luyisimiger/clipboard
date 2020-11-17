<template>
  <Clipboard :clipboard-object="clipboard" @save="onSave" />
</template>

<script>
import service from "../services/ClipboardService";
import Clipboard from "../components/Clipboard";

export default {
  name: "EditClipboard",
  components: {
    Clipboard
  },

  props: {
    clipboardObject: {
      type: Object,
      default: () => undefined,
      required: false
    },
    uuid: {
      type: String,
      default: "",
      required: false
    },
    fetch: {
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
      xfetch: this.fetch,
      clipboard: this.clipboardObject || { uuid: this.uuid, text: "" }
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

  mounted() {
    this.dofetch();
  },

  methods: {
    dofetch() {
      if (this.xfetch) {
        service.fetch(this.uuid).then(response => {
          if (response.data != null) {
            this.clipboard = response.data;
          }
        });
      }
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
          .then(() => {})
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

  watch: {},

  beforeRouteUpdate(to, from, next) {
    let clip = {
      uuid: to.params.uuid,
      text: to.params.text
    };

    this.uuid = to.params.uuid;
    this.xfetch = to.params.fetch;
    this.xfetch = this.xfetch === undefined ? true : this.xfetch;
    this.clipboard = clip;

    this.dofetch();
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
