import api from ".";

const path = "/clip";

const key = uuid => {
  return `clipboard:${uuid}`;
};

export default {
  create() {
    let url = `${path}/create`;
    return api.post(url);
  },

  key,

  save(payload) {
    let url = `${path}/save`;
    return api.post(url, payload);
    //let mykey = key(clipboard.uuid);
    //localStorage.setItem(mykey, JSON.stringify(clipboard));
    //return new Promise((resolve /*, reject*/) => resolve(clipboard));
  },

  fetch(uuid) {
    let url = `${path}/fetch`;
    return api.post(url, { uuid });
    //let mykey = key(uuid);
    //let clipboard = JSON.parse(localStorage.getItem(mykey));
    //localStorage.removeItem(mykey);
    //return new Promise((resolve /*, reject*/) => resolve(clipboard));
  },

  delete(uuid) {
    let url = `${path}/delete`;
    return api.post(url, { uuid });
  }
};
