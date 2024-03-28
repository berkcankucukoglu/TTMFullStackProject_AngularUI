import { Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/:projectId',
    component: DashboardComponent,
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
  },
  {
    path: 'categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'categories/edit/:id',
    component: EditCategoryComponent,
  },
];
