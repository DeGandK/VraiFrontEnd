import { ResolveFn } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';
import { catchError, of, tap } from 'rxjs';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const usersService: UserService = inject(UserService);
  let id = route.params['id'];
  return usersService
    .getById(id)
    .pipe(
      catchError((error) => of(error).pipe(tap((error) => console.log(error))))
    );
};
