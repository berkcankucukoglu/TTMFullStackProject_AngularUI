import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProjectComponent } from './components/dashboard/add-project/add-project.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FullStackProject_UI';
  constructor(private dialogRef: MatDialog) {}

  addProjectPopUp() {
    this.dialogRef.open(AddProjectComponent, {
      width: '40%',
    });
  }
}
