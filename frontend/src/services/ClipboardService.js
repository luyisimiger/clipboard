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
  },

  fetch(uuid) {
    let url = `${path}/fetch`;
    return api.post(url, { uuid });
  },

  delete(uuid) {
    let url = `${path}/delete`;
    return api.post(url, { uuid });
  }
};
