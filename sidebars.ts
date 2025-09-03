import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "doc",
      id: "getting-started/quick-start", 
      label: "Quick Start",
    },
    {
      type: "category",
      label: "API Docs",
      items: [
        {
          type: "category",
          label: "Text2SQL",
          items: [
            { type: "doc", id: "api/text2sql/index", label: "Overview" },
            { type: "doc", id: "api/text2sql/health-check", label: "/status" },
            {
              type: "doc",
              id: "api/text2sql/text-2-sql-conversion",
              label: "/text2sql",
            },
            {
              type: "doc",
              id: "api/text2sql/chart-generation",
              label: "/generate-chart",
            },
          ],
        },
        {
          type: "category",
          label: "Transaction/Balance",
          items: [
            {
              type: "doc",
              id: "api/tx-balance/get-transaction-data",
              label: "/tx/api/v1/sol/tx",
            },
            {
              type: "doc",
              id: "api/tx-balance/get-token-balance",
              label: "/balance/api/v1/sol/balance",
            },
          ],
        },
        {
          type: "category",
          label: "OHLCV",
          items: [
            {
              type: "doc",
              id: "api/ohlcv/get-candle-data",
              label: "/sol/candle",
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
