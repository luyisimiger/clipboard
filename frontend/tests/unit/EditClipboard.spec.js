import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises'
import EditClipboard from '@/views/EditClipboard.vue';
import "@/plugins/fingerprintjs2.js"
import "../mocks/axios"

Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(VueRouter)

const router = new VueRouter()
const vuetify = new Vuetify()


const wrapper = shallowMount(EditClipboard, { localVue, vuetify, router,
  propsData: {
    clipboardObject: {
      uuid: "31x",
      text: "lorem ipsum dolor"
    },
    fetch: false
  }
});

const vm = wrapper.vm;


describe('Se probará la vista EditClipboard', () => {

	test('obtener datos del servidor', async done  => {
    expect(vm.clipboard).toHaveProperty("uuid", "31x");
    expect(vm.clipboard).toHaveProperty("text", "lorem ipsum dolor");
    
    wrapper.setData({ xfetch: true });
    wrapper.setProps({ uuid: "eeK" });
    vm.dofetch();

    await flushPromises();

    wrapper.vm.$nextTick(() => {  
      expect(vm.clipboard).toHaveProperty("uuid", "eeK");
      expect(vm.clipboard).toHaveProperty("text", "hello world!");
      done()
    })
  });

  test('guardar datos en el servidor', async done  => {
    
    expect(vm.synchronizing).toBe(false);
    vm.onSave();
    expect(vm.synchronizing).toBe(true);
    
    await flushPromises();

    wrapper.vm.$nextTick(() => {  
      expect(vm.synchronizing).toBe(false);
      done()
    })
  });
}); 
