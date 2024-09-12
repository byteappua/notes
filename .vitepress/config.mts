import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "My Awesome Project",
  description: "A VitePress Site",
  lang: "zh-CN",
  base: "/code-note",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "hello-algo", link: "/hello-algo/docs/" },
      {
        text: "dolphindb",
        link: "https://bytewer.github.io/code-note/documentation.latest.zh/index.html",
        target: "_self",
        rel: "noreferrer",
      },
      { text: "test", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Bytewer/code-note" }],
  },
  markdown: {
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
  },
  vite: {
    assetsInclude: ["**/*.svg", "**/*.JPG", "**/*.PNG"],
  },
});
