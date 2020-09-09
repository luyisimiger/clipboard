import ShortUniqueId from "short-unique-id";
//import api from ".";

//const path = "/sync";

const options = {
  length: 3
};

const uid = new ShortUniqueId(options);

const key = uuid => {
  return `clipboard:${uuid}`
}

export default {
  create() {
    let clipboard = {
      uuid: uid(),
      text: ""
    }
    return clipboard;
  },

  key,

  synchronize(clipboard) {
    let mykey = key(clipboard.uuid);
    //return api.post(url, clipboard);
    localStorage.setItem(mykey, JSON.stringify(clipboard));
    return new Promise((resolve /*, reject*/) => resolve(clipboard));
  },

  fetch(uuid) {
    let mykey = key(uuid);
    let clipboard = JSON.parse(localStorage.getItem(mykey));
    //localStorage.removeItem(mykey);
    return new Promise((resolve /*, reject*/) => resolve(clipboard));
  }
}
