import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { HomeComponent } from './core/components/home/home.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'admin/categories', component: CategoryListComponent },
  { path: 'admin/categories/add', component: AddCategoryComponent },
  { path: 'admin/categories/:id', component: EditCategoryComponent },
];
