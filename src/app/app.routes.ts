import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadComponent: () =>
            import('./components/login/login.component').then((x) => x.LoginComponent),
    },
    {
        path: '',
        loadComponent: () =>
            import('./components/login/login.component').then((x) => x.LoginComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./components/dashboard/dashboard.component').then((x) => x.DashboardComponent),
    },
    {
        path: 'callback',
        loadComponent: () =>
            import('./components/dashboard/dashboard.component').then((x) => x.DashboardComponent),
    },
];
