import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Duty } from '../../../models/duty.model';
import { TasksService } from '../../../services/tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../../../services/projects.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  constructor(
    private dutyService: TasksService,
    private projectService: ProjectsService,
    private ref: MatDialogRef<AddTaskComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    ref.disableClose = true;
  }
  addTaskRequest: Duty = {
    id: null,
    name: '',
    description: '',
    lastModifieldDate: null,
    startDate: null,
    endDate: null,
    status: false,
    hours: 0,
    userId: -1,
    projectId: -1,
  };
  taskProjectId: number = -1;
  taskProjectTitle: string = '';

  ngOnInit(): void {
    this.taskProjectId = this.data.id;
    this.addTaskRequest.projectId = this.data.id;

    this.projectService.getProject(this.addTaskRequest.projectId).subscribe({
      next: (project) => {
        this.taskProjectTitle = project.name;
      },
    });

    console.log('Adding task to -> ' + this.taskProjectId);
  }

  addDuty() {
    this.dutyService.addDuty(this.addTaskRequest).subscribe({
      next: (task) => {
        console.log(task);
        this.router.navigate(['dashboard/' + this.data.id]);
        console.log(['dashboard/' + this.data.id]);

        this.data.refreshProjectDuties(this.taskProjectId);

        this.closePopUp();
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  closePopUp() {
    console.log('Canceled. ' + this.taskProjectId + "'s list refreshed.");
    this.data.refreshProjectDuties(this.taskProjectId);
    this.ref.close();
  }
}
