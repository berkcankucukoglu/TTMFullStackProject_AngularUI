import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit {
  categoryDetails: Category = {
    id: 0,
    name: '',
    description: '',
  };
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.categoryService.getCategory(id).subscribe({
            next: (response) => {
              this.categoryDetails = response;
            },
          });
        }
      },
    });
  }

  updateCategory() {
    if (this.categoryDetails.id) {
      this.categoryService
        .updateCategory(this.categoryDetails.id, this.categoryDetails)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['categories']);
          },
          error: (response) => {
            console.log(response);
          },
        });
    }
  }

  deleteCategory(id: number | string | null) {
    this.categoryService.deleteCategory(this.categoryDetails.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['categories']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
