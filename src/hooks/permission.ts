import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';
import { RoleEnum } from '@/enums/RoleEnum';

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.role ||
        route.meta?.role?.includes(RoleEnum.All) ||
        route.meta?.role?.includes(userStore.role || '')
      );
    },
    findFirstPermissionRoute(_routers: any, role = RoleEnum.ADMIN) {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.role?.find((el: string[]) => {
            return el.includes(RoleEnum.All) || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
