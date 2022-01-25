import React from "react";
import { DashboardList } from "../components/Dashboard/DashboardList/DashboardList";

export default {
  title: "Components/Dashboard",
  component: DashboardList,
  argTypes: {
    token: {
      description: "keycloack user valid token",
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
    onClick: {
      description: "func",
      type: { name: "func", required: false },
      control: {
        type: "func",
      },
    },
  },
};

const Template = (args) => <DashboardList {...args} />;

export const List = Template.bind({});
List.args = {
  token: "",
  env: "local",
};
