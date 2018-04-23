import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/Hello'
import Test from 'components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Hello2',
      component: Test
    }
  ]
})
