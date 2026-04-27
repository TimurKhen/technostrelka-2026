import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth';
import { catchError, switchMap, throwError, filter, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {

        if (authService.isRefreshing) {
          return authService.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((newToken) => {
              return next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }))
            })
          )
        } else {
          authService.isRefreshing = true
          authService.refreshTokenSubject.next(null)

          return authService.refresh().pipe(
            switchMap((tokens) => {
              authService.isRefreshing = false
              authService.refreshTokenSubject.next(tokens.accessToken)

              return next(req.clone({ setHeaders: { Authorization: `Bearer ${tokens.accessToken}` } }))
            }),
            catchError((err) => {
              authService.isRefreshing = false
              authService.logout()
              return throwError(() => err)
            })
          )
        }
      }
      return throwError(() => error)
    })
  )
}
