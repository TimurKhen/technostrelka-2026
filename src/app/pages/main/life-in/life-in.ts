import { Component } from '@angular/core';
import { ViewportAnimationDirective } from '../../../directives/viewport-animation';

@Component({
  selector: 'app-life-in',
  imports: [ViewportAnimationDirective],
  templateUrl: './life-in.html',
  styleUrl: './life-in.scss',
})
export class LifeIn {
  abilities = [
    'Мастер-классы',
    'Выступления',
    'Дегустации',
    'Командообразующие мероприятия'
  ]
}
