import React from "react";
import { DashboardItem } from "../components/Dashboard/DashboardList/DashboardItem";

export default {
  title: "Components/Dashboard",
  component: DashboardItem,
  argTypes: {
    name: {
      description: "dashboard name",
      type: { name: "string" },
      control: {
        type: "text",
      },
    },
    description: {
      description: "dashboard description",
      type: { name: "string" },
      control: {
        type: "text",
      },
    },
    updatedAt: {
      description: "last update",
      type: { name: "string" },
      control: {
        type: "text",
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

const Template = (args) => <DashboardItem {...args} />;

export const Item = Template.bind({});
Item.args = {
  name: "lorem ipsum",
  description: "consectetur adipiscing",
  updatedAt: "2021-12-23T10:51:29.452Z",
};
