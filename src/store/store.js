import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

Vue.use(Vuex)
//使用实例如以下test
const store = new Vuex.Store({
    //状态
    state:{
        // test:'ljm'
        routes:[],
        role:''
    },
    //同步方法
    mutations:{
        // test:(state,value)=>{
        //    state.test=value
        // }
        set_routes(state,value){
            state.routes=value
        },
        set_role:(state,value)=>{
            state.role=value
        },
        login_out(state){
            state.routes=[]
            state.role=''
            sessionStorage.removeItem('role')
            router.push('/login')
        }
        
    },
    //异步方法
    actions:{
        // test1({ commit },value){
        //     commit('test',value)
        // }
        AsynSet_routes({commit},value){
            commit('set_routes',value)
        },
        AsynSet_role:({commit},value)=>{
            commit('set_role',value)
        },
        AsynLogin_out({commit}){
            commit('login_out')
        }
    }
})

export default store
