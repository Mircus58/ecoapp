import { Routes } from '@angular/router';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { EmployeeGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then(m => m.RegisterComponent),
  },
  
  {
    path: 'admin/dashboard',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'admin/calendar/:userId',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin/calendar-management/calendar-management.component').then(m => m.CalendarManagementComponent),
  },
  {
    path: 'employee/calendar',
    canActivate: [EmployeeGuard],
    loadComponent: () =>
      import('./pages/employee/calendar/calendar.component').then(m => m.CalendarComponent),
  },
  {
    path: 'employee/photo',
    canActivate: [EmployeeGuard],
    loadComponent: () =>
      import('./pages/employee/photo/photo.component').then(m => m.PhotoComponent),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  }
];
