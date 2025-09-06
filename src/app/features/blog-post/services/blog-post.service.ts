import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  
  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/BlogPosts`);
  }
  
  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`);
  }
  
  getBlogPostByUrlHandle(urlHandle: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${urlHandle}`);
  }

  createBlogPost(data: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts`, data, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  updateBlogPost(id: string, updatedBlogPost: UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`, updatedBlogPost, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/BlogPosts/${id}`, {
      headers: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }
}
