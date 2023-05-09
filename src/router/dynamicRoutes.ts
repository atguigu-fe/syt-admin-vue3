/*
 * @Author: 朽木白
 * @Date: 2023-02-25 09:19:28
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-04-29 11:25:43
 * @Description: 动态路由
 */

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
    redirect: '/hospital',
    meta: {
      title: '医院管理',
      icon: 'Lock',
    },
    children: [
      {
        name: 'Hospital/Set',
        path: '/hospital/hospitalset',
        component: () => import('@/views/hospital/hospitalset/hospitalset.vue'),
        meta: {
          title: '医院设置',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Hospital/List',
        path: '/hospital/hospitallist',
        component: () =>
          import('@/views/hospital/hospitallist/hospitallist.vue'),
        meta: {
          title: '医院列表',
          icon: 'Avatar',
        },
      },
    ],
  },
  // 数据管理
  {
    name: 'Cmn',
    path: '/cmn',
    component: LAYOUT,
    redirect: '/cmn',
    meta: {
      title: '数据管理',
      icon: 'Lock',
    },
    children: [
      {
        name: 'Cmn/Dict',
        path: '/cmn/dict',
        component: () => import('@/views/cmn/dict/dict.vue'),
        meta: {
          title: '数据字典',
          icon: 'UserFilled',
        },
      },
    ],
  },
]
