import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Fusion CMS",
  tagline: "A modern multi-database CMS for modern developers",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://fusion-cms.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "anshumanfs",
  projectName: "fusion-cms",

  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/anshumanfs/fusion-cms/tree/main/fusion-cms-docs/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.svg",
    navbar: {
      title: "Fusion CMS",
      logo: {
        alt: "Fusion CMS Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/anshumanfs/fusion-cms",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
            {
              label: "API Reference",
              to: "/docs/api/exposing-apis",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/anshumanfs/fusion-cms",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fusion CMS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
