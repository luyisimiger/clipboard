import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import router from "@/router";

Vue.use(Vuetify)

const localVue = createLocalVue()
const vuetify = new Vuetify()
const wrapper = shallowMount(App, { localVue, vuetify, router } );
const vm = wrapper.vm;

describe("Testing integrity of data() properties", () => {
    test('should have drawer property', () => {
        expect(wrapper.vm.$data).toHaveProperty('drawer')
        expect(typeof wrapper.vm.drawer).toBe('boolean')
    })

    test('should have loading property', () => {
        expect(wrapper.vm.$data).toHaveProperty('loading')
        expect(typeof wrapper.vm.loading).toBe('boolean')
    })

});