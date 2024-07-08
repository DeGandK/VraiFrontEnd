import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-dialregister',
  templateUrl: './dialregister.component.html',
  styleUrls: ['./dialregister.component.css'],
  providers: [DialogService, MessageService],
})
export class DialregisterComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  registerForm!: FormGroup;
  displayRegisterDialog: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirmed: ['', Validators.required],
        profilePicture: [''],
      },
      { validators: this.matchingPasswords('password', 'passwordConfirmed') }
    );
  }

  show() {
    this.displayRegisterDialog = true;
  }

  register() {
    if (this.registerForm.valid) {
      const { username, email, password, profilePicture } =
        this.registerForm.value;
      this.authService
        .register(username, email, password, profilePicture)
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Registration successful',
            });
            this.hideDialog();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Registration failed',
            });
            console.error('Registration failed', error);
          },
          complete: () => {
            console.log('Registration process completed');
          },
        });
    } else {
      console.error('Registration form is invalid');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill out the form correctly',
      });
    }
  }

  matchingPasswords(passwordKey: string, passwordConfirmedKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(passwordConfirmedKey)?.value;
      return password === confirmPassword ? null : { notMatching: true };
    };
  }

  hideDialog() {
    this.displayRegisterDialog = false;
  }

  get f() {
    return this.registerForm.controls;
  }
}
