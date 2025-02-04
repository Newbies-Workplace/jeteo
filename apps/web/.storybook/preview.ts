import type { Preview } from "@storybook/react";
import "@/app/globals.css";
import "./fonts.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "default",
      values: [
        {
          name: "default",
          value: "#F3F3F3",
        },
      ],
    },
  },
};

export default preview;
