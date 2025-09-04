import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownModule, DatePipe],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
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
