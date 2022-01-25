import React from "react";
import { Dashboard as DashboardContainer } from "../components/Dashboard/Dashboard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Dashboard",
  component: DashboardContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    id: {
      description: "dashboard id",
      type: { name: "string", required: true },
      control: {
        type: "text",
      },
    },
    env: {
      description: "dbr environment",
      options: ["local", "demo", "sandbox"],
      type: { name: "string", required: false },
      control: {
        type: "select",
      },
    },
  },
};

const Template = (args) => <DashboardContainer {...args} />;

export const Dashboard = Template.bind({});
Dashboard.args = {
  id: "",
};
