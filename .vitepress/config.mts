import { defineConfig } from "vitepress";

import AutoNav from "vite-plugin-vitepress-auto-nav";
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
    plugins: [
      AutoNav({
        // pattern: ["**/!(README|TODO).md"], // 也可以在这里排除不展示的文件，例如不匹配 README 和 TODO 文件
        pattern: ["**/!(TODO).md"], // 也可以在这里排除不展示的文件，例如不匹配 README 和 TODO 文件
        // 自定义配置
        compareFn: (a, b) => {
          // 按最新提交时间(没有提交记录时为本地文件修改时间)升序排列
          return (
            (b.options.lastCommitTime || b.options.modifyTime) -
            (a.options.lastCommitTime || a.options.modifyTime)
          );
        },
        useArticleTitle: true, // 全局开启使用文章一级标题作为文章名称
      }),
    ],
  },
});
