import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/text2sql/index",
      label: "Text2SQL Overview",
    },
    {
      type: "category",
      label: "Endpoints", 
      items: [
        {
          type: "doc",
          id: "api/text2sql/health-check",
          label: "Health Check",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/text2sql/text-2-sql-conversion",
          label: "Text2SQL Conversion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/text2sql/chart-generation",
          label: "Chart Generation",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
