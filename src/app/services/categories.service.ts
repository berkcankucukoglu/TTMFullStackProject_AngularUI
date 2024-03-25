import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseApiUrl + '/api/category');
  }

  addCategory(addCategoryRequest: Category): Observable<Category> {
    return this.http.post<Category>(
      this.baseApiUrl + '/api/category',
      addCategoryRequest
    );
  }

  getCategory(id: number | string | null): Observable<Category> {
    return this.http.get<Category>(this.baseApiUrl + '/api/category/' + id);
  }

  updateCategory(
    id: number | string,
    updateCategoryRequest: Category
  ): Observable<Category> {
    return this.http.put<Category>(
      this.baseApiUrl + '/api/category/' + id,
      updateCategoryRequest
    );
  }

  deleteCategory(id: number | string | null): Observable<Category> {
    return this.http.delete<Category>(this.baseApiUrl + '/api/category/' + id);
  }
}
