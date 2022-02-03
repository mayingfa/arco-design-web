export default {
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    locale: '数据可视化',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      path: 'data-analysis',
      name: 'dataAnalysis',
      component: () => import('@/views/visualization/data-analysis/index.vue'),
      meta: {
        locale: '分析页',
        requiresAuth: true,
        role: ['admin'],
      },
    },
    {
      path: 'multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () =>
        import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: '多维数据分析',
        requiresAuth: true,
        role: ['admin'],
      },
    },
  ],
};
