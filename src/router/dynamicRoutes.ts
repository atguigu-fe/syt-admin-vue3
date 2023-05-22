/**
 * @description 📚 路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
import { RouteRecordRaw } from 'vue-router'

const LAYOUT = () => import('@/layouts/index.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // 权限管理
  {
    name: 'Acl',
    path: '/acl',
    component: LAYOUT,
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    children: [
      {
        name: 'Acl/User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Acl/Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'Avatar',
        },
      },
      {
        name: 'Acl/Permision',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Menu',
        },
      },
    ],
  },
  // 医院管理
  {
    name: 'Hospital',
    path: '/hospital',
    component: LAYOUT,
    redirect: '/hospital/hospitalset',
    meta: {
      title: '医院管理',
      icon: 'office-building',
    },
    children: [
      {
        name: 'Hospital/Set',
        path: '/hospital/hospitalset',
        component: () => import('@/views/hospital/hospitalset/hospitalset.vue'),
        meta: {
          title: '医院设置',
          icon: 'Setting',
        },
      },
      {
        name: 'Hospital/List',
        path: '/hospital/hospitallist',
        component: () =>
          import('@/views/hospital/hospitallist/hospitallist.vue'),
        meta: {
          title: '医院列表',
          icon: 'tickets',
        },
      },
      {
        name: 'Hospital/Show',
        path: '/hospital/hospitallist/show',
        component: () => import('@/views/hospital/hospitallist/show.vue'),
        meta: {
          title: '查看',
          isHide: true,
        },
      },
      {
        name: 'Hospital/Schedule',
        path: '/hospital/hospitallist/schedule',
        component: () => import('@/views/hospital/hospitallist/schedule.vue'),
        meta: {
          title: '排班',
          isHide: true,
        },
      },
    ],
  },
  // 数据管理
  {
    name: 'Cmn',
    path: '/cmn',
    component: LAYOUT,
    redirect: '/cmn/dict',
    meta: {
      title: '数据管理',
      icon: 'coin',
    },
    children: [
      {
        name: 'Cmn/Dict',
        path: '/cmn/dict',
        component: () => import('@/views/cmn/dict/dict.vue'),
        meta: {
          title: '数据字典',
          icon: 'coin',
        },
      },
    ],
  },
  // 会员管理
  {
    name: 'Member',
    path: '/member',
    component: LAYOUT,
    redirect: '/member/memberList',
    meta: {
      title: '会员管理',
      icon: 'UserFilled',
    },
    children: [
      {
        name: 'Member/memberList',
        path: '/member/memberList',
        component: () => import('@/views/member/memberList/memberList.vue'),
        meta: {
          title: '会员列表',
          icon: 'tickets',
        },
      },
      {
        name: 'Member/certificationApprovalList',
        path: '/member/certificationApprovalList',
        component: () =>
          import(
            '@/views/member/certificationApprovalList/certificationApprovalList.vue'
          ),
        meta: {
          title: '认证审批列表',
          icon: 'tickets',
        },
      },
      {
        name: 'Member/Show',
        path: '/member/memberList/show',
        component: () => import('@/views/member/memberList/show.vue'),
        meta: {
          title: '查看',
          isHide: true,
        },
      },
    ],
  },
  // 订单管理
  {
    name: 'Order',
    path: '/order',
    component: LAYOUT,
    redirect: '/order/orderList',
    meta: {
      title: '订单管理',
      icon: 'tickets',
    },
    children: [
      {
        name: 'Order/orderList',
        path: '/order/orderList',
        component: () => import('@/views/order/orderList/orderList.vue'),
        meta: {
          title: '订单列表',
          icon: 'tickets',
        },
      },
      {
        name: 'Order/Show',
        path: '/order/orderList/show',
        component: () => import('@/views/order/orderList/show.vue'),
        meta: {
          title: '查看',
          isHide: true,
        },
      },
    ],
  },
  // 预约统计
  {
    name: 'Statistics',
    path: '/statistics',
    component: LAYOUT,
    redirect: '/statistics/appointmentStatistics',
    meta: {
      title: '统计管理',
      icon: 'watch',
    },
    children: [
      {
        name: 'Statistics/appointmentStatistics',
        path: '/statistics/appointmentStatistics',
        component: () =>
          import(
            '@/views/statistics/appointmentStatistics/appointmentStatistics.vue'
          ),
        meta: {
          title: '预约统计',
          icon: 'watch',
        },
      },
    ],
  },
]
