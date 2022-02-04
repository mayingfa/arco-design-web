import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    role?: string[];
    requiresAuth: boolean;
    icon?: string;
    locale?: string;
    menuSelectKey?: string;
  }
}
