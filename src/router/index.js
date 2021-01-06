import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../view/layout.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

//上和右双导航中router配置说明，右侧导航是根据对应导航的cihldren里的子导航对应的，然后上放导航的component都为一样
export default new Router({
  routes: [
    {
      path: '/login',
      hidden:true,
      component:()=>import('../view/login/login.vue'),
      meta: { title: '登陆界面'}
    },
    {
      path: '/',
      redirect: '/homePage1',
      component:Layout,
      meta: { title: '主页',role:'user'},
      children:[
        {
          path: '/homePage1',
          component:()=>import('../view/home/components/page1.vue'),
          meta: { title: '主页内容1'},
        },
        {
          path: '/homePage2',
          component:()=>import('../view/home/components/page2.vue'),
          meta: { title: '主页内容2'},
        }
      ]
    },
    {
      path: '/user',
      redirect: '/userPage1',
      component:Layout,
      meta: { title: '用户',role:'user'},
      children:[
        {
          path: '/userPage1',
          component:()=>import('../view/user/components/page1.vue'),
          meta: { title: '用户内容1'},
        },
        {
          path: '/userPage2',
          component:()=>import('../view/user/components/page2.vue'),
          meta: { title: '用户内容2'},
        }
      ]
    }
  ]
})
