import Main from './components/Main.vue'
import Search from './components/Search.vue'
import Result from './components/Result.vue'

const routers = [
  {
    path: '/_mg', // 后台管理
    name: 'main',
    component: Main
  },
  {
    path: '/search',
    component: Result
  },
  {
    path: '/', // 搜索首页
    component: Search
  }
]

export default routers
