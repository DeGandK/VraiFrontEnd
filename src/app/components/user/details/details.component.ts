import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  id!: number;
  currentUser!: User;

  constructor(private ar: ActivatedRoute, private userService: UserService) {}
  ngOnInit(): void {
    this.getUserDetails();
  }
  getUserDetails(): void {
    const id = this.ar.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getById(+id).subscribe({
        next: (data: User) => {
          this.currentUser = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
