import React from 'react';
import { Dashboard } from '../components/Dashboard/Dashboard';
// import DashboardComponent from '../components/Dashboard/Dashboard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dashboard',
  component: Dashboard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      description: 'dashboard id',
      type: { name: 'string', required: true },
      control: {
        type: 'text'
      }
    }
  },
};

const Template = (args) => <Dashboard {...args} />;

export const Dashboard1 = Template.bind({});
Dashboard1.args = {
  id: '',
};
