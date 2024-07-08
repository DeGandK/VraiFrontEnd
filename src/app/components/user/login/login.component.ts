import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialregisterComponent } from '../../dialregister/dialregister.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fg!: FormGroup;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private builder: FormBuilder,
    private dialService: DialogService
  ) {
    this.fg = builder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.registerForm = this.builder.group(
      {
        username: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        passwordConfirmed: [null, [Validators.required]],
        profilePicture: [null, [Validators.required]],
      },
      {
        validator: this.matchingPasswords('password', 'passwordConfirmed'),
      }
    );
  }

  login() {
    if (this.fg.valid) {
      this.authService.login(this.fg.value['email'], this.fg.value['password']);
    }
  }

  showModal() {
    this.dialService.open(DialregisterComponent, {});
  }

  register() {
    console.log(this.registerForm.value);
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.username,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.profilePicture
        )
        .subscribe({
          next: (response) => {
            console.log('Registration successful');
            //Recharge ma liste
          },
          error: (error) => {
            console.error('Registration failed', error.error);
          },
          complete: () => {
            console.log('Registration process completed');
          },
        });
    } else {
      console.error('Registration form is invalid');
    }
  }

  matchingPasswords(passwordKey: string, passwordConfirmedKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      let password = group.get(passwordKey)?.value;
      let confirmPassword = group.get(passwordConfirmedKey)?.value;
      return password === confirmPassword ? null : { notMatching: true };
    };
  }

  get f() {
    return this.registerForm.controls;
  }
}
