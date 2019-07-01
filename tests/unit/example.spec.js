import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Fotter from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders appName when passed', () => {
    const appName = 'test app name';
    const wrapper = shallowMount(Fotter, {
      propsData: { appName },
    });
    expect(wrapper.text()).to.include(appName);
  });
});
