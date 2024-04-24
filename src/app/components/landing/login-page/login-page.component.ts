import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  private validateAllFormFields(fg: FormGroup) {
    //Instead of [disabled]="loginForm.invalid" on button element, we validate from on submit.
    Object.keys(fg.controls).forEach((field) => {
      const control = fg.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess || response.token) {
            this.loginForm.reset();

            this.auth.storeToken(response.accessToken);

            const tokenPayload = this.auth.decodedToken();
            this.auth.setFullNameForStore(tokenPayload.unique_name);
            this.auth.setRoleForStore(tokenPayload.role);
            this.router.navigate(['/dashboard']);
          } else {
            this.loginForm.get('password')?.setValue('');
            alert(response.message);
          }
        },
        error: (response) => {
          console.log(response);
        },
      });
    } else {
      this.validateAllFormFields(this.loginForm);
      console.log('Login form is not valid.');
    }
  }
}
