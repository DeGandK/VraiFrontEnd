import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../user/login/login.component';
import { User } from '../../models/user.model';
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
    public dialogService: DialogService,
    private messageService: MessageService,
    private authService: AuthService,
    private fb: FormBuilder // Utilisation du FormBuilder pour construire le formulaire
  ) {}

  ngOnInit() {
    // Initialisation du formulaire
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirmed: ['', Validators.required],
        profilePicture: [''],
      },
      {
        validators: this.matchingPasswords('password', 'passwordConfirmed'),
      }
    );
  }

  show() {
    this.displayRegisterDialog = true; // Affiche le dialogue
  }

  register() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.username,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.passwordConfirmed,
          this.registerForm.value.profilePicture
        )
        .subscribe({
          next: (response) => {
            console.log('Registration successful');
            // Rechargez votre liste ou effectuez toute autre action nécessaire après l'enregistrement réussi
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

  hideDialog() {
    this.displayRegisterDialog = false; // Cache le dialogue
  }

  get f() {
    return this.registerForm.controls;
  }
}
