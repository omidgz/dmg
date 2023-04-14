import { mount } from '@vue/test-utils';
import EditItem from './EditItem.vue';

describe('EditItem', () => {
  let wrapper;
  const id = 1;
  const name = 'Test Item';
  const onUpdate = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    wrapper = mount(EditItem, {
      propsData: { id, name, onUpdate, onCancel },
    });
  });

  it('should render a text input and two buttons', () => {
    const input = wrapper.find('input[type="text"]');
    const updateButton = wrapper.find('button:first-of-type');
    const cancelButton = wrapper.find('button:last-of-type');

    expect(input.exists()).toBe(true);
    expect(updateButton.exists()).toBe(true);
    expect(cancelButton.exists()).toBe(true);
  });

  it('should update the item name when the input changes', async () => {
    const input = wrapper.find('input[type="text"]');

    await input.setValue('New Item Name');

    expect(wrapper.vm.itemName).toBe('New Item Name');
  });

  it('should call onUpdate when the update button is clicked', async () => {
    const updateButton = wrapper.find('button:first-of-type');
    const input = wrapper.find('input[type="text"]');

    await input.setValue('New Item Name');
    await updateButton.trigger('click');

    expect(onUpdate).toHaveBeenCalledWith({ id, name: 'New Item Name' });
  });

  it('should call onCancel when the cancel button is clicked', async () => {
    const cancelButton = wrapper.find('button:last-of-type');

    await cancelButton.trigger('click');

    expect(onCancel).toHaveBeenCalled();
  });
});
