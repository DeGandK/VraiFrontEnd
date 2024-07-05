import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-listusers',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  liste: User[] = [];

  constructor(private userService: UserService, private router: Router) {
    this.loadData();
  }

  loadData() {
    this.userService.getAll().subscribe({
      next: (data: User[]) => {
        this.liste = data;
        console.log(data);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  selectUser(id: number) {
    this.router.navigate(['details', id]);
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      next: () => this.loadData(),
    });
  }
}
