import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/ohlcv/index",
      label: "OHLCV Overview",
    },
    {
      type: "category",
      label: "Endpoints",
      items: [
        {
          type: "doc",
          id: "api/ohlcv/get-candle-data",
          label: "/sol/candle",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
