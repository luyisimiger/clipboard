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

describe('Testing the correct rendering of elements', () => {
    
    test('should render 1 div', () => {
        expect(wrapper.find('div.d-flex.align-center').exists()).toBeTruthy();
        expect(wrapper.find('div.d-flex.align-center').element.tagName).toBe('DIV');
    })

    // representa el renderizado de los componentes hijos
    test('should render vuetify tags', () => {
        expect(wrapper.find('v-app-stub').exists()).toBeTruthy();
        expect(wrapper.find('v-app-bar-stub').exists()).toBeTruthy();
        expect(wrapper.find('v-main-stub').exists()).toBeTruthy();
        expect(wrapper.find('v-footer-stub').exists()).toBeTruthy();
    })
});