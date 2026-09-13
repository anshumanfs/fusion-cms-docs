import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/configuration",
        "getting-started/running",
        "getting-started/cli",
        "getting-started/troubleshooting",
      ],
    },
    {
      type: "category",
      label: "Architecture",
      items: ["architecture"],
    },
    {
      type: "category",
      label: "Core Concepts",
      items: ["core-concepts/databases", "core-concepts/schemas", "core-concepts/users"],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        "tutorials/register-admin",
        "tutorials/create-application",
        "tutorials/generate-api",
        "tutorials/access-control",
      ],
    },
    {
      type: "category",
      label: "Access Control",
      items: ["access-control/authentication", "access-control/access-schemas"],
    },
    {
      type: "category",
      label: "API Reference",
      items: ["api/exposing-apis"],
    },
    {
      type: "category",
      label: "Advanced",
      items: ["advanced/custom-code", "advanced/beta-limitations"],
    },
  ],
};

export default sidebars;
