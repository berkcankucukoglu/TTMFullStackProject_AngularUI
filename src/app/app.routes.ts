import { Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';

export const routes: Routes = [
  {
    path: '',
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
];
