import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Center } from './pages/center/center';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'center',
    component: Center
  }
]
