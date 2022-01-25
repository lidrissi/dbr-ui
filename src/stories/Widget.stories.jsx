import React from "react";
import { WidgetWrapper } from "../components/Widget/WidgetWrapper";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Widget",
  component: WidgetWrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    widget: {
      description: "widget config",
      type: { name: "string", required: true },
      control: {
        type: "object",
      },
    },
    showTitle: {
      description: "show or hide widget header",
      control: { type: "boolean" },
    },
  },
};

const Template = (args) => (
  <div style={{ height: "400px" }}>
    <WidgetWrapper {...args} />
  </div>
);

export const Widget = Template.bind({});
Widget.args = {
  widget: {},
  showTitle: true,
};
