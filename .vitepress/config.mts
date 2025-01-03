import { defineConfig } from "vitepress";
//import { VitePWA } from "vite-plugin-pwa";
import AutoNav from "vite-plugin-vitepress-auto-nav";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "笔记",
  description: "知识库",
  lang: "zh-CN",
  base: "/notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/byteappua/notes" }],
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
      //https://xaviw.github.io/XaviDocs/%E5%B7%A5%E5%85%B7%E7%B3%BB%E5%88%97/VitePress%E6%90%AD%E5%BB%BA/%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E7%9B%AE%E5%BD%95.html
      AutoNav({
        // pattern: ["**/!(README|TODO).md"], // 也可以在这里排除不展示的文件，例如不匹配 README 和 TODO 文件
        itemsSetting: {
          // a: { hide: true }, // 不显示名称为 a 的文件夹或 md 文件
          // b: { title: 'bb' }, // 名称为 b 的文件夹或文件在菜单中显示为 bb
          // c/b: { sort : 3 }, // 通过路径精确匹配 c 文件夹下的 b 进行配置，排序时位于下标3的位置或最后
          // c/b2: { useArticleTitle: false }, // 关闭使用文章一级标题作为文章名称
          // d: { collapsed: true }, // 文件夹折叠配置
          java: { collapsed: true }, // 文件夹折叠配置
          kaogong: { collapsed: true }, // 文件夹折叠配置
        },
        compareFn: (a: any, b: any) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (a.isFolder && !b.isFolder) {
            return -1;
          }
          return nameA.localeCompare(nameB, "zh-CN");
          // 按最新提交时间(没有提交记录时为本地文件修改时间)升序排列
          // return (
          //   (b.options.lastCommitTime || b.options.modifyTime) -
          //   (a.options.lastCommitTime || a.options.modifyTime)
          // );
        },
        useArticleTitle: true, // 全局开启使用文章一级标题作为文章名称
      }),
      //VitePWA({
      //injectRegister: "auto",
      //registerType: "autoUpdate",
      //devOptions: {
      //enabled: true, // 是否支持开发模式下也使 pwa 生效
      //},

      // MANIFEST PWA https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html
      //includeAssets: ["../public/next.svg"], // 应该是下面 manifest 中可能用到的文件名字吧
      //manifest: {
      //id: "/notes/",
      //name: "标题日记",
      //short_name: "日记",
      //theme_color: "#373737",
      //start_url: "./",
      // display: "standalone",
      //background_color: "#373737",
      //icons: [
      //{
      //src: "next.svg",
      //sizes: "512x512",
      //type: "image/svg+xml",
      //purpose: "any",
      //},
      //],
    ],
  },
});
