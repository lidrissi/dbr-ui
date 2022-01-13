import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Dashboard',
  component: Dashboard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      name: 'dashboard id',
      type: { name: 'string', required: true },
      control: {
        type: 'text'
      }
    }
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Dashboard {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  id: '',
};
