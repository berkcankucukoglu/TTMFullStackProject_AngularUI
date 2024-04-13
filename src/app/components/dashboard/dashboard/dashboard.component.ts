import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Project } from '../../../models/project.model';
import { ProjectsService } from '../../../services/projects.service';
import { CommonModule } from '@angular/common';
import { EditProjectComponent } from '../edit-project/edit-project.component';
import { Duty } from '../../../models/duty.model';
import { TasksService } from '../../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialogRef: MatDialog,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
    private dutyService: TasksService
  ) {}
  lists: Project[] = [];
  tasks: Duty[] = [];

  hasParam: boolean = false;
  projectId: number = -1;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.hasParam = Object.keys(params).length !== 0;
      this.projectId = params['projectId'];
      console.log('Selected project id -> ' + this.projectId);
      this.dutyService
        .getProjectDuties(params['projectId'])
        .subscribe((tasks: any) => {
          this.tasks = tasks;
        });
    });

    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.lists = projects;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  addProjectPopUp() {
    this.dialogRef.open(AddProjectComponent, {
      width: '40%',
    });
  }

  editProjectPopUp(id: any) {
    this.dialogRef.open(EditProjectComponent, {
      width: '40%',
      data: id,
    });
  }

  addTaskPopUp() {
    this.dialogRef.open(AddTaskComponent, {
      width: '40%',
      data: {
        id: this.projectId,
        refreshProjectDuties: (id: number) => {
          this.dutyService.getProjectDuties(id).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        },
      },
    });
  }

  editTaskPopUp(id: any) {
    this.dialogRef.open(EditTaskComponent, {
      width: '40%',
      data: {
        id: id,
        refreshProjectDuties: (id: number) => {
          this.dutyService.getProjectDuties(id).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        },
      },
    });
  }

  changeTaskStatus(id: any) {
    if (id) {
      this.dutyService.switchDutyStatus(id).subscribe({
        next: (response) => {
          console.log(response);
          this.dutyService
            .getProjectDuties(this.projectId)
            .subscribe((tasks: any) => {
              this.tasks = tasks;
            });
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  deleteTask(id: any) {
    if (id) {
      this.dutyService.deleteDuty(id).subscribe({
        next: (response) => {
          console.log(response);
          this.dutyService
            .getProjectDuties(this.projectId)
            .subscribe((tasks: any) => {
              this.tasks = tasks;
            });
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }
}
