import request from './core'
// import axios from 'axios'

export default {
    getDetail(data){
        return request({
            url:'https://192.168.1.150:9000/web3/',
            method:'post',
            data
        })
    },

    // 登录接口
    teacherLogin(data){
        return request({
            url:'/login/',
            method:'post',
            data
        })
    },
    // 注册接口
    register(data){
        return request({
            url:'/register/',
            method:'post',
            data
        })
    },


    // 参考的路由，无用
    orderCtrl (data) {
        return request({
            url: 'app/coach/orderCtrl',
            method: 'post',
            data
        })
    },
    // 参考的路由，无用
    coachLogin (data) {
        return request({
            url: 'app/coach/coachLogin',
            method: 'get',
            params:data
        })
    },

}

