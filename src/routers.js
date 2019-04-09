import Main from './components/Main.vue'
import Search from './components/Search.vue'
import Result from './components/Result.vue'
import Document from './components/Document.vue'

const routers = [
  {
    path: '/_mg', // 后台管理
    name: 'main',
    component: Main
  },
  {
    path: '/document/:id', // 文档详情页
    name: 'document',
    component: Document
  },
  {
    path: '/search', // 搜索结果页
    component: Result
  },
  {
    path: '/', // 搜索首页
    component: Search
  }
]

export default routers
