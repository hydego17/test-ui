import type { Meta, StoryObj } from "@storybook/react";
import { Select } from ".";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Select options:",
    id: 'select-1',
    multiple: true,
    withSearch: true,
    placeholder: "",
    options: [
      {
        value: "1",
        label: "Option 1",
      },
      {
        value: "2",
        label: "Option with item",
      },
      {
        value: "3",
        label: "Long Long Option 3",
      },
      {
        value: "4",
        label: "Long Long Long Option 4",
      },
      {
        value: "5",
        label: "Long Long Long Long Option 5",
      },
      {
        value: "6",
        label: "Long Long Long Long Long Option 6",
      },
    ],
  },
};
