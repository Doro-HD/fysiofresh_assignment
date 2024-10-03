import { mount } from '@vue/test-utils';
import { describe, expect, onTestFinished, test } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import Task from '../../src/components/Task.vue';
import TaskForm from '../../src/components/TaskForm.vue';

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require('resize-observer-polyfill');

const title = 'Task 1';
const description = 'Task description';

const task = {
  props: {
    id: 'test',
    title,
    description,
    onEdit: async (taskId, newTitle, newDescription) => {}
  },
  global: {
    plugins: [vuetify],
    components: {
      TaskForm
    }
  }
};

function getTestTask() {
  const wrapper = mount(Task, task);
  onTestFinished(() => wrapper.unmount());

  return wrapper;
}

describe('Task', () => {
  test('Title and desciption are set according to props', () => {
    const wrapper = getTestTask();

    const taskTitle = wrapper.get('[data-test-task="title"]');
    const taskDescription = wrapper.get('[data-test-task="description"]');

    expect(taskTitle.text()).toBe(title);
    expect(taskDescription.text()).toBe(description);
  });

  test('Emits delete event to parent', () =>  {
    const wrapper = getTestTask();
    const deleteButton = wrapper.get('[data-test-task="delete"]');

    deleteButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('delete');
  });
});