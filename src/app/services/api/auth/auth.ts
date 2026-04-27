import { UserService } from './../user/user';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from '../token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient)
  private cookieService = inject(CookieService)
  private UserService = inject(UserService)

  isRefreshing = false
  refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  private readonly token = signal<string | null>(null)
  private readonly refreshToken = signal<string | null>(null)

  refresh() {
    const refreshToken = this.cookieService.get('refreshToken')
    return this.http.post<any>(
      `/api/auth/refresh`,
      {
        "refresh_token": refreshToken
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      ).pipe(
        tap(tokens => this.storeTokens(tokens)),
        catchError(err => {
          this.logout()
          return throwError(() => err);
        })
      )
  }

  storeTokens(tokens: TokenResponse) {
    this.cookieService.set('token', tokens.access_token)
    this.cookieService.set('refresh_token', tokens.refresh_token)
    this.token.set(tokens.access_token)
    this.refreshToken.set(tokens.refresh_token)
  }

  getAccessToken() { return this.cookieService.get('token') }

  get isAuth() {
    if (!this.token()) {
      this.loadUserData()
    }
    return !!this.token()
  }

  loadUserData() {
    this.token.set(this.cookieService.get('token'))
    this.refreshToken.set(this.cookieService.get('refreshToken'))

    if (this.token()) {
      this.UserService.getMe().subscribe()
    }
  }

  logout() {
    this.cookieService.deleteAll()
    window.location.href = '/auth/'
  }
}
