import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/members',
    title: 'Members',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/evenements',
    title: 'Evenements',
    icon: 'bi bi-clock',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/publications',
    title: 'Publications',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/outils',
    title: 'Outils',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    submenu: []
  }
];
