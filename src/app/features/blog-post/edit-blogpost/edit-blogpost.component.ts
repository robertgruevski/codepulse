import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownModule, DatePipe, AsyncPipe, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit {
  id: string | null = null;
  model$?: Observable<BlogPost>;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.model$ = this.route.paramMap.pipe(
      tap((params) => {
        this.id = params.get('id');
      }),
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.blogPostService.getBlogPostById(id).pipe(
            tap((blogPost) => {
              this.selectedCategories = blogPost.categories.map((category) => category.id);
            })
          );
        }
        return new Observable<BlogPost>();
      })
    );
  }

  onFormSubmit(model: BlogPost): void {
    if (this.id && model) {
      var updateBlogPost: UpdateBlogPost = {
        content: model.content,
        author: model.author,
        shortDescription: model.shortDescription,
        featuredImageUrl: model.featuredImageUrl,
        isVisible: model.isVisible,
        publishedDate: model.publishedDate,
        title: model.title,
        urlHandle: model.urlHandle,
        categories: this.selectedCategories ?? [],
      };

      // The subscription is now short-lived and doesn't need to be managed
      this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts');
        },
      });
    }
  }

  onDelete(): void {
    if(this.id) {
      this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      })
    }
  }
}
