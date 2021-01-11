import Vue from 'vue'
import VueRouter from 'vue-router'
import pay from './components/pay'
import students from './components/students'
import App from './App.vue'



Vue.use(VueRouter,);

const routes=[

  {path:'/',component :students},
  {path:'/pay',component :pay}

]

const router=new VueRouter({
  routes
})

Vue.config.productionTip = false
new Vue
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')
