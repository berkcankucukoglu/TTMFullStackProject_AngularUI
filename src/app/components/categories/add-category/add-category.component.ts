import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  addCategoryRequest: Category = {
    id: null,
    name: '',
    description: '',
    userId: -1,
  };

  ngOnInit(): void {}

  addCategory() {
    this.categoryService.addCategory(this.addCategoryRequest).subscribe({
      next: (category) => {
        console.log(category);
        this.router.navigate(['categories']);
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
