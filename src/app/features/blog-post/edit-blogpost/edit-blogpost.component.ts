import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownModule, DatePipe, AsyncPipe],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {

  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
