import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { NavbarComponent } from '../../navbar/navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent implements OnInit {
  public role: string = '';

  constructor(
    private categoryService: CategoriesService,
    private authService: AuthService
  ) {}
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

    this.authService.getRoleFromStore().subscribe((value) => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = value || roleFromToken;
    });

    console.log(this.role);
  }
}
