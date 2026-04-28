import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { Center } from './pages/center/center';
import { Adaptation } from './pages/adaptation/adaptation';
import { Loyalty } from './pages/loyalty/loyalty';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'center',
    component: Center
  },
  {
    path: 'adaptation',
    component: Adaptation
  },
  {
    path: 'home',
    component: Main
  },
  {
    path: 'loyality',
    component: Loyalty
  }
]
