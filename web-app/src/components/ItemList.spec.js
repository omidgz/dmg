import { shallowMount } from '@vue/test-utils'
import ItemsList from './ItemsList.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('ItemsList.vue', () => {
  let mockAxios = new MockAdapter(axios)

  beforeEach(() => {
    mockAxios.reset()
  })

  it('renders the component', async () => {
    mockAxios.onGet('api/items').reply(200, [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ])

    const wrapper = shallowMount(ItemsList)
    await wrapper.vm.$nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Items')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.findAll('li').length).toBe(3)
  })

  it('creates a new item', async () => {
    mockAxios.onGet('api/items').reply(200, [])
    mockAxios.onPost('api/items').reply(200, { id: 1, name: 'New Item' })

    const wrapper = shallowMount(ItemsList)
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input[type="text"]')
    input.setValue('New Item')
    wrapper.find('form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li span').text()).toBe('New Item')
    expect(input.element.value).toBe('')
  })

  it('deletes an item', async () => {
    mockAxios.onGet('api/items').reply(200, [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ])
    mockAxios.onDelete('api/items/1').reply(200)

    const wrapper = shallowMount(ItemsList)
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('li').length).toBe(2)

    wrapper.find('li button:last-child').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.findAll('li').length).toBe(1)
    expect(wrapper.find('li span').text()).toBe('Item 2')
  })

  it('edits an item', async () => {
    mockAxios.onGet('api/items').reply(200, [{ id: 1, name: 'Item 1' }])
    mockAxios.onPut('api/items/1').reply(200, { id: 1, name: 'Updated Item' })

    const wrapper = shallowMount(ItemsList)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('li span').text()).toBe('Item 1')

    wrapper.find('li button:first-child').trigger('click')
    await wrapper.vm.$nextTick()

    const input = wrapper.find('li input[type="text"]')
    input.setValue('Updated Item')
    wrapper.find('li form').trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('li span').text()).toBe('Updated Item')
  })
})
