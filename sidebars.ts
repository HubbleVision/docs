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
      id: "overview",
      label: "Overview",
    },

    {
      type: "category",
      label: "Data Catalog",
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "data-catalog/solana-data-coverage",
          label: "Solana Data Coverage",
        },
      ],
    },

    {
      type: "category",
      label: "API Docs",
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Agent",
          collapsed: false,
          items: [
            { type: "doc", id: "api/agent/health-check", label: "/status" },
            {
              type: "doc",
              id: "api/agent/text2sql",
              label: "/text2sql",
            },
            {
              type: "doc",
              id: "api/agent/text2chart",
              label: "/generate-chart",
            },
          ],
        },
        {
          type: "category",
          label: "Transaction/Balance",
          collapsed: false,
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
          collapsed: false,
          items: [
            {
              type: "doc",
              id: "api/ohlcv/get-candle-data",
              label: "/sol/candle",
            },
          ],
        },
        {
          type: "doc",
          id: "api/holders/index",
          label: "Holders (Soon)",
          className: "coming-soon-item",
        },
        {
          type: "doc",
          id: "api/launchpad/index",
          label: "Launchpad (Soon)",
          className: "coming-soon-item",
        },
        {
          type: "doc",
          id: "api/tokeninfo/index",
          label: "Tokeninfo (Soon)",
          className: "coming-soon-item",
        },
        {
          type: "doc",
          id: "api/wallet-pnl/index",
          label: "Wallet PnL (Soon)",
          className: "coming-soon-item",
        },
        {
          type: "doc",
          id: "api/transfer/index",
          label: "Transfer (Soon)",
          className: "coming-soon-item",
        },
      ],
    },
  ],
};

export default sidebars;
