import { Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { LoginPageComponent } from './components/landing/login-page/login-page.component';
import { SignupPageComponent } from './components/landing/signup-page/signup-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'dashboard/:projectId',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    component: CategoriesListComponent,
  },
  {
    path: 'categories/add',
    canActivate: [authGuard],
    component: AddCategoryComponent,
  },
  {
    path: 'categories/edit/:id',
    canActivate: [authGuard],
    component: EditCategoryComponent,
  },
];
