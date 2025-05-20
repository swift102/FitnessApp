import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
    {
        path: 'workouts',
        loadComponent: () => import('./workouts/workouts.page').then( m => m.WorkoutsPage)
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.page').then( m => m.ProgressPage)
      },
    
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'workouts',
    loadComponent: () => import('./workouts/workouts.page').then( m => m.WorkoutsPage)
  },
 {
    path: 'workout-detail/:uid',
    loadComponent: () => import('./workout-detail/workout-detail.page').then( m => m.WorkoutDetailPage)
  },
  {
    path: 'progress',
    loadComponent: () => import('./progress/progress.page').then( m => m.ProgressPage)
  },
];
