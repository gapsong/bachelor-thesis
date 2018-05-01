import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/Hello'
import Test from 'components/Test'
import Profile from 'components/Profile/Profile'

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
      name: 'Test',
      component: Test
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
