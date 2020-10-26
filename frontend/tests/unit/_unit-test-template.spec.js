import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import router from "@/router";

Vue.use(Vuetify)

const localVue = createLocalVue()
const vuetify = new Vuetify()
const wrapper = mount(App, { localVue, vuetify, router } );
const vm = wrapper.vm;


describe('Nombre del set de pruebas', () => {
  // aqui van las pruebas
});

describe('Nombre del set de pruebas II', () => {
	test('Nombre de la prueba', ()  => {
    // aqui va el codigo de la prueba
  });

  test('Nombre de la prueba II', ()  => {
    expect(1).toBe(1);
  });
}); 

