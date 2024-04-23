import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AddProjectComponent } from '../../dashboard/add-project/add-project.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  public fullName: string = '';
  public role: string = '';

  constructor(private dialogRef: MatDialog, private auth: AuthService) {}

  ngOnInit() {
    this.auth.getFullNameFromStore().subscribe((value) => {
      const fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = value || fullNameFromToken;
    });

    this.auth.getRoleFromStore().subscribe((value) => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = value || roleFromToken;
    });
  }

  addProjectPopUp() {
    this.dialogRef.open(AddProjectComponent, {
      width: '40%',
    });
  }

  logout() {
    this.auth.logout();
  }
}
