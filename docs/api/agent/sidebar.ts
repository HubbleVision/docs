import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Endpoints",
      items: [
        {
          type: "doc",
          id: "api/agent/health-check",
          label: "Health Check",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/agent/text2sql",
          label: "Text2SQL Conversion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/agent/text2chart",
          label: "Chart Generation",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
