import Vue from 'vue'
import App from '@/App'
import router from '@/router'

// 兼容IE9+
import 'babel-polyfill'

// 自定义
import '@/common/mock'
import '@/assets/index'

// 第三方库
import MintUI, {Indicator, Toast} from 'mint-ui'
import VueProgressBar from 'vue-progressbar'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);
Vue.prototype.$indicator = Indicator;
Vue.prototype.$toast = Toast;
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

// 全局错误捕捉, 防止单页面卡死
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (error, vm, info) {
    console.log(error);
    Toast(info)
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
