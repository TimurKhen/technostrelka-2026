import { Routes } from '@angular/router';
import { Registration } from './pages/auth/registration/registration';
import { Login } from './pages/auth/login/login';
import { AuthMain } from './pages/auth/main/main';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthMain
  },
  {
    path: 'signup',
    component: Login
  },
  {
    path: 'registration',
    component: Registration
  }
]
