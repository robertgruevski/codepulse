import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  imports: [FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id) {
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          })
        }
      },
    });
  }

  onFormSubmit(): void {
    console.log(this.category);
  }

  ngOnDestroy(): void {
      this.paramsSubscription?.unsubscribe();
  }
}
