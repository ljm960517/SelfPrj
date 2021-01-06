<template>
  <div>
    <!-- 顶部菜单栏 -->
    <div class="topBar">
        <div class="topBar-select" v-for="(item,index) in topBarRoutes" :key="index">
            <span v-if="!item.hidden" style="margin-left:50px;" @click="topBarPush(item)">{{item.meta.title}}</span>
        </div>
        <div class="topBar-out" @click="loginOut">
            退出登陆
        </div>
    </div>
    <!-- 右边菜单栏 -->
    <div class="body">
      <div class="sideBar">
        <div class="sideBar-select" v-for="(item,index) in sideBarRoutes" :key="index">
            <p @click="sideBarPush(item)">{{item.meta.title}}</p>
        </div>
      </div>
      <!-- 中间内容栏 -->
      <div class="content">
        <keep-alive>
        <router-view :key="key" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "layout",
  data() {
    return {
      sideBarRoutes:[],
      test:[{id:1,name:'1'},{id:2,name:'2'},{id:3,name:'3'}]
    };
  },
  computed: {
    //绑定key值使路由跳转不错乱
    key() {
      return this.$route.path;
    },
    topBarRoutes(){
      return this.$store.state.routes
    }
  },
  mounted() {
//筛选出不用的路由，即隐藏属性为true的路由
var fitTopBarRoutes=this.topBarRoutes.filter(res=>!res.hidden)
this.sideBarRoutes=fitTopBarRoutes[0].children
//跳转对应角色的路由首页
this.$router.push(`${fitTopBarRoutes[0].path}`)
  },
  methods: {
    //顶部菜单栏点击事件，点击事件已传入v-for中的item
     topBarPush(item){
      this.sideBarRoutes=item.children
    },
     //右侧菜单栏点击事件，点击事件已传入v-for中的item
    sideBarPush(item){
      this.$router.push(`${item.path}`)
    },
    loginOut(){
      this.$store.dispatch('AsynLogin_out')
    }
  }
};
</script>
<style lang="scss" scoped>
.topBar {
  width: 100%;
  height: 50px;
  font-size:24px;
  background: gray;
  display: flex;
  align-items: center;
  .topBar-out{
    position: fixed;
    right:50px
  }
}
.body {
  height: calc(100vh - 50px);
  display: flex;
  .sideBar {
    height: 100%;
    width: 100px;
    background: lavender;
  }
}
</style>
