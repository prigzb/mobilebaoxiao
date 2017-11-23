// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import yun from 'yun-ui'
import 'yun-ui/dist/yun/index.css'
import oauth from './js/oauth'
import URL from 'url'
import store from './store'
import axios from 'axios'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'
import 'yun-ui/dist/yun/Loading/index.css'
import {getUserInfo} from './api/getData'
import VCharts from 'v-charts'
// import {XuntongJSBridge} from '@/js/qingjs'

Vue.use(YDUI)
Vue.use(VCharts)
Vue.prototype.$http = axios
// alert(navigator.userAgent)
Vue.use(yun)
Vue.config.productionTip = false
/* eslint-disable no-new */

    // 获取token
let testFunc = async function() {
    try {
        let params = URL.parse(self.location.href, true).query
        let ticket = params.ticket
        // ticket = 'ddf2665a4db603b9fdb1e260eaea74cf'
        // alert('ticket:' + ticket)
        let appid = params.appid
        let result = await oauth.getAccessToken('10132')
        let token = result.access_token
        // alert('token:' + token)
        // alert('appid:' + appid)
        let isYzjApp = navigator.userAgent.match(/Qing\/.*;(iOS|iPhone|Android).*/)
        console.log(isYzjApp)
        // if (isYzjApp) {
            let url = '/openauth2/api/getcontext'
            // let resData = await oauth.sendRequest(url, token, ticket)
            console.log(token, ticket, url)
            let yid = '3f546b49-a2a1-11e7-aa29-005056b8712a'
            // if (resData) yid = resData.openid
            let param = {yzjid: yid, method: 'getUserDetailByYzjId'}
            // let par = JSON.stringify(params)
            let res = await getUserInfo(param)
            console.log(res)
            if (res.data.flag === '0') {
              console.log(res.data.data)
              sessionStorage.setItem('user', JSON.stringify(res.data.data))
            } else {
              // XuntongJSBridge.call('close')
              sessionStorage.setItem('user', JSON.stringify(res.data))
            }
      new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {
          App
        }
      })
      if (appid === '10133') {
        router.replace('/indexSearch')
      } else if (appid === '10134') {
        router.replace('/assistant/assIndex')
      } else if (appid === '10135') {
        router.replace('/manage/index')
      } else {
        router.replace('/index')
      }
        // }
    } catch (error) {
        console.log(error)
    }
}
testFunc()
