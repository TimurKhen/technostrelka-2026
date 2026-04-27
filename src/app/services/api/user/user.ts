import { User } from '../../../interfaces/user/user';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { masterURL } from '../masterURL';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../token';
import { FormdataConverter } from '../formdataConverter/formdata-converter';
import { AuthService } from '../auth/auth';

export interface RegistrationData {
  email: string | null,
  username: string | null,
  firstName: string | null,
  surname: string | null,
  password: string | null,
  avatar: File | null
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient)
  private formData = inject(FormdataConverter)
  private authService = inject(AuthService)

  private apiUrl = masterURL + 'api/user/'
  private meUrl = this.apiUrl + 'me/'
  private registerUrl = this.apiUrl + 'register/'
  private loginUrl = this.apiUrl + 'login/'

  private userData = signal<User | null>(null)

  getMe(): Observable<User> {
    return this.http.get<User>(
      this.meUrl
    ).pipe(
      tap((val) => {
        this.userData.set(val)
      })
    )
  }

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      this.loginUrl,
      JSON.stringify(
        {
          "email": email,
          "password": password
        }
      ),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(
      tap(token => this.authService.storeTokens(token))
    )
  }

  register(userForm: RegistrationData) {
    const formData = this.formData.ObjectToFormData(userForm)

    return this.http.post(
      this.registerUrl,
      formData,
    )
  }
}
