import {expect} from 'chai'
import AppContent from '@/components/AppContent'
import {mount, shallowMount} from '@vue/test-utils'

describe('AppContent.vue', () => {
  const title = 'Title'
  const subtitle = 'Subtitle'

  it('renders props.title when passed', () => {
    const wrapper = shallowMount(AppContent, {
      propsData: {title}
    })
    expect(wrapper.text()).to.include(title)
  })

  it('renders props.subtitle when passed', () => {
    const wrapper = shallowMount(AppContent, {
      propsData: {title, subtitle}
    })
    expect(wrapper.text()).to.include(subtitle)
  })

  it('didn\'t renders props.subtitle when not passed', () => {
    const wrapper = shallowMount(AppContent, {
      propsData: {title}
    })
    expect(wrapper.text()).to.not.include(subtitle)
  })

  it('renders slot when passed', () => {
    const wrapper = mount(AppContent, {
      propsData: {title},
      slots: {
        default: '<p>Test</p>'
      }
    })
    expect(wrapper.contains('p')).to.equal(true)
    expect(wrapper.text()).to.include('Test')
  })
})
