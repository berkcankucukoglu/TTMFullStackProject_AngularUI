import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Duty } from '../../../models/duty.model';
import { TasksService } from '../../../services/tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  constructor(
    private dutyService: TasksService,
    private projectService: ProjectsService,
    private ref: MatDialogRef<EditTaskComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    ref.disableClose = true;
  }
  editTaskRequest: Duty = {
    id: null,
    name: '',
    description: '',
    lastModifieldDate: null,
    startDate: null,
    endDate: null,
    status: false,
    hours: 0,
    userId: 1,
    projectId: -1,
  };
  taskProjectTitle: string = '';
  projects: Project[] = [];

  ngOnInit(): void {
    console.log(this.data);
    this.dutyService.getDuty(this.data.id).subscribe({
      next: (duty) => {
        console.log('Editing task id -> ' + duty.id);
        this.editTaskRequest = duty;
      },
    });
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
    });
  }

  editDuty() {
    if (this.editTaskRequest.id) {
      this.dutyService
        .updateDuty(this.editTaskRequest.id, this.editTaskRequest)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate([
              'dashboard/' + this.editTaskRequest.projectId,
            ]);

            this.data.refreshProjectDuties(this.editTaskRequest.projectId);

            this.closePopUp();
          },
          error: (response) => {
            console.log(response);
          },
        });
    }
  }

  deleteTask(id: number | string | null) {
    if (this.editTaskRequest.id) {
      this.dutyService.deleteDuty(this.editTaskRequest.id).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['dashboard/' + this.editTaskRequest.projectId]);

          this.data.refreshProjectDuties(this.editTaskRequest.projectId);

          this.closePopUp();
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  closePopUp() {
    console.log(
      'Canceled. ' + this.editTaskRequest.projectId + "'s list refreshed."
    );
    this.data.refreshProjectDuties(this.editTaskRequest.projectId);
    this.ref.close();
  }
}
