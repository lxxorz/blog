import { defineConfig } from 'vitepress'

type SideItem = {
  text: string
  link: string
  children?: SideItem[]
}
const globalPrefix=(prefix: string[] | string, side_items: SideItem[])=>{
  const prefixArr = typeof prefix === 'string' ? [prefix] : prefix
  return side_items.map(item => {
    item.link = [...prefixArr, item.link].join('/')
    if (item.children) {
      item.children = globalPrefix(prefix, item.children)
    }
    return item
  })
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  title: "computer science docs",
  description: "docs about cs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: globalPrefix("docs/cs", [
          { text: '撤销回退-如何找回正确的历史记忆', link: '/undo-redo' },
          {text: '非常推荐的几个编程频道', link: '/programming-channels'},
        ])
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
