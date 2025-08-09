import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/tx-balance/index",
      label: "Transaction / Balance 概览",
    },
    {
      type: "category",
      label: "Endpoints",
      items: [
        {
          type: "doc",
          id: "api/tx-balance/get-transaction-data",
          label: "/tx/api/v1/sol/tx",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/tx-balance/get-token-balance",
          label: "/balance/api/v1/sol/balance",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
