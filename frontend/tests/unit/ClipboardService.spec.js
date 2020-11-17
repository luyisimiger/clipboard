import Vue from "vue";
import Vuetify from "vuetify";
import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import router from "@/router";
import service from "@/services/ClipboardService"
import "../mocks/axios"

Vue.use(Vuetify);

const localVue = createLocalVue();
const vuetify = new Vuetify();
const wrapper = mount(App, { localVue, vuetify, router });
const vm = wrapper.vm;

describe("Se probará servicios ofrecidos por el API", () => {
  it("should create a clipboard", () => {
    service
      .create()
      .then(response => {
        expect(response.data).toHaveProperty("uuid", "eeK");
        expect(response.data).toHaveProperty("text");
      });
  });

  it("should save a clipboard", () => {
    service
      .save({ uuid: "rgY", text: "this is a test" })
      .then(response => {
        expect(response.data).toHaveProperty("uuid", "rgY");
        expect(response.data).toHaveProperty("text", "this is a test");
      });
  });

  it("should fetch a clipboard", () => {
    service
      .fetch({ uuid: "eeK" })
      .then(response => {
        expect(response.data).toHaveProperty("uuid", "eeK");
        expect(response.data).toHaveProperty("text", "hello world!");
      });
  });

  it("should delete a clipboard", () => {
    service
      .delete({ uuid: "xyZ" })
      .then(response => {
        expect(response.data).toHaveProperty("uuid", "xyZ");
      });
  });

});
