import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public url: string = 'https://localhost:7045/api/Quiz';
  constructor(private client: HttpClient) {}

  getAll(): Observable<Quiz[]> {
    return this.client.get<Quiz[]>(this.url);
  }

  getById(id: number) {
    return this.client.get<Quiz>(this.url + '/' + id);
  }
}
