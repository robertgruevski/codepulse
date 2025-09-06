import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }
  
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`, model, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }
  
  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, updateCategoryRequest, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  deleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }
}
