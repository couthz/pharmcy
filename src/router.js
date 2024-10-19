import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'weui-bar__item--on',
  routes: [
    {
      path: '/',
      redirect: { name: 'home_index' }
    },
    {
      path: '/auth',
      name: 'index_auth',
      component: () => import('./views/Index/Auth.vue'),
      meta: {
        title: '微信授权'
      }
    },
    {
      path: '/opencard',
      name: 'index_opencard',
      component: () => import('./views/Index/OpenCard.vue'),
      meta: {
        title: '开卡'
      }
    },
    {
      path: '/opencard_success',
      name: 'index_opencard_success',
      component: () => import('./views/Index/OpenCardSuccess.vue'),
      meta: {
        title: '开卡成功'
      }
    },
    {
      path: '/bindphonenumber',
      name: 'index_bind_phonenumber',
      component: () => import('./views/Index/BindPhoneNumber.vue'),
      meta: {
        title: '绑定手机号码'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'index',
          name: 'home_index',
          component: () => import('./views/Home/Index.vue'),
          meta: {
            title: '在线药房'
          }
        },
        {
          path: 'category',
          name: 'home_category',
          component: () => import('./views/Goods/Category.vue'),
          meta: {
            title: '商品分类'
          }
        },
        {
          path: 'mine',
          name: 'home_mine',
          component: () => import('./views/Mine/Index'),
          meta: {
            title: '用户中心'
          }
        }
      ]
    },
    {
      path: '/goods/list/:id',
      name: 'goods_list',
      component: () => import('./views/Goods/Index.vue'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: '/goods/info/:id',
      name: 'goods_info',
      component: () => import('./views/Goods/Info.vue'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Goods/Search.vue'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/mine/consumptiondetail',
      name: 'mine_consumptiondetail',
      component: () => import('./views/Mine/ConsumptionDetail.vue'),
      meta: {
        title: '消费明细'
      }
    },
    {
      path: '/mine/integraldetail',
      name: 'mine_integraldetail',
      component: () => import('./views/Mine/IntegralDetail.vue'),
      meta: {
        title: '积分明细'
      }
    },
    {
      path: '/mine/membercard',
      name: 'mine_membercard',
      component: () => import('./views/Mine/MemberCard.vue'),
      meta: {
        title: '会员卡'
      }
    },
    /** remind */
    {
      path: '/remind',
      name: 'remind',
      component: () => import('./views/Remind/Index.vue'),
      children: [
        {
          path: 'list',
          name: 'remind_list',
          component: () => import('./views/Remind/List.vue'),
          meta: {
            title: '我的提醒'
          }
        },
        {
          path: 'add_1',
          name: 'remind_add_1',
          component: () => import('./views/Remind/Add_1.vue'),
          meta: {
            title: '用药提醒'
          }
        },
        {
          path: 'update/1_:id',
          name: 'remind_update_1',
          component: () => import('./views/Remind/Update_1.vue'),
          meta: {
            title: '修改用药提醒'
          }
        },
        {
          path: 'add_2',
          name: 'remind_add_2',
          component: () => import('./views/Remind/Add_2.vue'),
          meta: {
            title: '监测提醒'
          }
        },
        {
          path: 'update/2_:id',
          name: 'remind_update_2',
          component: () => import('./views/Remind/Update_2.vue'),
          meta: {
            title: '修改监测提醒'
          }
        },
        {
          path: 'share/:id',
          name: 'remind_share',
          component: () => import('./views/Remind/Share.vue'),
          meta: {
            title: '分享提醒'
          }
        }
      ]
    },
    /** monitor */
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('./views/Monitor/Index.vue'),
      children: [
        {
          path: 'add_1',
          name: 'monitor_addbloodpressure',
          component: () => import('./views/Monitor/AddBloodPressure.vue'),
          meta: {
            title: '添加血压记录'
          }
        },
        {
          path: 'list_1',
          name: 'monitor_bloodpressurelist',
          component: () => import('./views/Monitor/BloodPressureList.vue'),
          meta: {
            title: '血压记录列表'
          }
        },
        {
          path: 'add_2',
          name: 'monitor_addbloodglucose',
          component: () => import('./views/Monitor/AddBloodGlucose.vue'),
          meta: {
            title: '添加血糖记录'
          }
        },
        {
          path: 'list_2',
          name: 'monitor_bloodglucoselist',
          component: () => import('./views/Monitor/BloodGlucoseList.vue'),
          meta: {
            title: '血糖记录列表'
          }
        },
        {
          path: 'add_3',
          name: 'monitor_addweight',
          component: () => import('./views/Monitor/AddWeight.vue'),
          meta: {
            title: '添加体重记录'
          }
        },
        {
          path: 'list_3',
          name: 'monitor_weightlist',
          component: () => import('./views/Monitor/WeightList.vue'),
          meta: {
            title: '体重记录列表'
          }
        },
        {
          path: 'record',
          name: 'monitor_record',
          component: () => import('./views/Monitor/Record.vue'),
          meta: {
            title: '监测记录'
          }
        }
      ]
    }
  ]
})
