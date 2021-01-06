import router from '../router/index'
import store from '../store/store'



router.beforeEach(async(to, from, next) => {
  //这一步很重要，下方的if判断由于没有登陆会无限循环判断，即使最后next('/login')进入login可是没有登陆依然在判断
  //，这一步return抛出进入/login到下一个if的定义域里，即可进入login不再循环判断，优先next()
  if (to.path === '/login'){
    return next()
  }
  //根据是否有storage来判断是否登陆
  if (sessionStorage.getItem('role')) {
    console.log('已登录')
    //通过过滤器匹配对应角色的路由，然后再通过vuex给予vuex中的路由，再在对应页面加载
    var res = router.options.routes.filter(res => res.meta.role == store.state.role)
    store.dispatch('AsynSet_routes', res)
    if (store.state.role) {
      console.log('没刷新')   //没刷新页面啥事都没
      next()
    } else {
      console.log('刷新了页面')
      //就再添加一次符合条件的路由和角色，但是匹配条件不能用store里的role和routes，因为刷新会没，得用storage里的
      var res = router.options.routes.filter(res => res.meta.role == sessionStorage.getItem('role'))
      store.dispatch('AsynSet_routes', res)
      store.dispatch('AsynSet_role',sessionStorage.getItem('role'))
      next()
    }


  } else {
    //没有登陆返回登陆页面
    console.log('没有登陆')
  next('/login')
  }


  
  // ...
});
