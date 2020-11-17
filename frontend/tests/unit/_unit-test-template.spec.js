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
	test('Nombre de la prueba', ()  => {
    expect(1).toBe(1);
  });
}); 

