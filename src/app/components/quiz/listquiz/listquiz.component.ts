import { Component } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-listquiz',
  templateUrl: './listquiz.component.html',
  styleUrl: './listquiz.component.css',
})
export class ListquizComponent {
  maListe: Quiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {
    this.loadData();
  }

  loadData() {
    this.quizService.getAll().subscribe({
      next: (data: Quiz[]) => {
        this.maListe = data;
        console.log(data);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  selectQuiz(id: number) {
    this.router.navigate(['detailsquiz', id]);
  }
}
