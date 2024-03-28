import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { CommonModule } from '@angular/common';
import { TasksService } from '../../../services/tasks.service';
import { Duty } from '../../../models/duty.model';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css',
})
export class EditProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectsService,
    private categoryService: CategoriesService,
    private dutyService: TasksService,
    private router: Router,
    private ref: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number | string
  ) {}

  projectDetails: Project = {
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

    if (this.data) {
      this.projectService.getProject(this.data).subscribe({
        next: (response) => {
          this.projectDetails = response;
        },
      });
    }
  }

  updateProject() {
    if (this.projectDetails.id) {
      this.projectService
        .updateProject(this.projectDetails.id, this.projectDetails)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['dashboard']);
            this.closePopUp();
          },
          error: (response) => {
            console.log(response);
          },
        });
    }
  }

  deleteProject(id: number | string | null) {
    if (this.projectDetails.id) {
      this.projectService.deleteProject(this.projectDetails.id).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['dashboard']);
          this.closePopUp();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  closePopUp() {
    this.ref.close();
  }
}
