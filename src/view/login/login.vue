<template>
    <div class="login">
        <div class="login-title">
             <h1>登陆界面(账号密码在同级account.js文件下----fenzhi))</h1>
        </div>
        <div class="login-body">
           <input type="text" v-model="username" placeholder="用户名">
           <input type="number" v-model="password" placeholder="用户密码(仅数字)">
           <button @click="login">登陆</button>
        </div>
    </div>
</template>
<script>
import account from './account'
export default {
    data(){
        return{
          username:'',
          password:''
        }
    },
    methods:{
      login(){
          //从数据库里获得对应账号密码数据
          var resAccount=account.filter(res=>res.username==this.username&&res.password==this.password)
          //先判断有无从数据库里获取对应账号密码
           if(resAccount.length>0){
                //使用vuex存储role角色，刷新页面会没
           this.$store.dispatch('AsynSet_role',resAccount[0].role)
           //使用storage存储角色，刷新还在
           sessionStorage.setItem('role',resAccount[0].role)
               this.$router.push('/')
           }else{
             //没有获取到对应的
             alert('账号不存在或账号密码错误');
           }
      }
    }
}
</script>