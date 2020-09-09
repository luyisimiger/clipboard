<template>
  <v-textarea
    v-model="clipboard.text"
    class="font-monaco"
    name="clip"
    placeholder="The clipboard text"
    solo
    flat
    auto-grow
    @input="onClipInput"
  >{{ text }}</v-textarea>
</template>

<script>
import service from "../services/ClipboardService";
export default {
  name: "Clipboard",

  props: {
    uuid: String,
    text: String
  },

  data() {
    return {
      drawer: true,
      clipboard: {
        uuid: this.uuid,
        text: this.text
      }
    };
  },

  mounted() {
    let that = this;
    let mykey = service.key(this.clipboard.uuid);
    
    window.addEventListener("storage", event => {
      if (event.key == mykey) {
        that.clipboard = JSON.parse(event.newValue);
      }
    });

    this.fetch();
  },

  methods: {
    fetch() {
      service.fetch(this.uuid).then(clipboard => {
        if (clipboard != null) {
          this.clipboard = clipboard;
        }
      });
    },

    onClipInput() {
      service.synchronize(this.clipboard);
    }
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
