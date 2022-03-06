import { RoleEnum } from '@/enums/RoleEnum';

export default {
  path: 'list',
  name: 'list',
  component: () => import('@/views/list/index.vue'),
  meta: {
    locale: '列表页',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'searchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: '查询表格',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
    {
      path: 'card',
      name: 'card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: '卡片列表',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
  ],
};
