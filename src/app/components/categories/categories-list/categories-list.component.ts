import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  constructor(private categoryService: CategoriesService) {}
  categories: Category[] = [];

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
