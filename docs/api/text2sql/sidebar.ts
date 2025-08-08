import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/text2sql/index",
      label: "Text2SQL 概览",
    },
    {
      type: "category",
      label: "Endpoints",
      items: [
        {
          type: "doc",
          id: "api/text2sql/health-check",
          label: "/status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/text2sql/text-2-sql-conversion",
          label: "/text2sql",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/text2sql/chart-generation",
          label: "/generate-chart",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
