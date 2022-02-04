import { RoleEnum } from '@/enums/roleEnum';

export default {
  path: 'user',
  name: 'user',
  component: () => import('@/views/user/index.vue'),
  meta: {
    locale: '个人中心',
    icon: 'icon-user',
    requiresAuth: true,
  },
  children: [
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale: '用户信息',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
    {
      path: 'setting',
      name: 'setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        locale: '用户设置',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
  ],
};
