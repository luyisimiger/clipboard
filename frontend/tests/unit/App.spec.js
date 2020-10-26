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

describe('Se probará la vista principal App', () => {

	test('Click en boton nuevo', ()  => {
    let loading;

    loading = wrapper.vm.loading;
    expect(loading).toBe(false);

    wrapper.find('#btn-new').trigger('click')

    loading = wrapper.vm.loading;
    expect(loading).toBe(true);

  });
}); 
