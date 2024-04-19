import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required],
      gender: [null, Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      if (
        this.signUpForm.value.passwordCheck !== this.signUpForm.value.password
      ) {
        this.signUpForm.get('passwordCheck')?.setValue('');
        console.log('Sign Up form is not valid.');
        return;
      } else {
        const user: User = {
          id: null,
          firstName: this.signUpForm.get('firstName')?.value,
          lastName: this.signUpForm.get('lastName')?.value,
          email: this.signUpForm.get('email')?.value,
          password: this.signUpForm.get('password')?.value,
          gender: parseInt(this.signUpForm.get('gender')?.value, 10),
        };

        this.auth.addUser(user).subscribe({
          next: (resp) => {
            console.log(resp);
            this.signUpForm.reset();
            this.router.navigate(['/login']);
          },
          error: (resp) => {
            console.log(resp);
          },
        });
      }
    } else {
      console.log('Sign Up form is not valid.');
    }
  }
}
