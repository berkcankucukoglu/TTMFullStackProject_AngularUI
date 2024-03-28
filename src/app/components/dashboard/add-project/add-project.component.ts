import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Project } from '../../../models/project.model';
import { ProjectsService } from '../../../services/projects.service';
import { Category } from '../../../models/category.model';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectsService,
    private ref: MatDialogRef<AddProjectComponent>,
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  addProjectRequest: Project = {
    id: null,
    name: '',
    description: '',
    lastModifieldDate: null,
    startDate: null,
    endDate: null,
    status: false,
    userId: 1,
    categoryId: -1,
    duties: [],
  };
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

  addProject() {
    this.projectService.addProject(this.addProjectRequest).subscribe({
      next: (project) => {
        console.log(project);
        this.router.navigate(['dashboard']);
        this.closePopUp();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  closePopUp() {
    this.ref.close();
  }
}
