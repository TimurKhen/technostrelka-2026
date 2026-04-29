import { Component } from '@angular/core';
import { ViewportAnimationDirective } from '../../../directives/viewport-animation';

interface ability {
  name: string,
  description: string
}

@Component({
  selector: 'app-life-in',
  imports: [ViewportAnimationDirective],
  templateUrl: './life-in.html',
  styleUrl: './life-in.scss',
})
export class LifeIn {
  abilities: ability[] = [
    {
      name: 'Мастер-классы',
      description: 'У нас вам всегда будет чем заняться. '
    },
    {
      name: 'Выступления',
      description: 'Приглашаем топовых спикеров с самыми интересными и современными докладами на различные темы.'
    },
    {
      name: 'Дегустации',
      description: 'Регулярно радуем сотрудников блюдами из ресторанов и баров.'
    },
    {
      name: 'Командообразующие мероприятия',
      description: 'В нашем центре мы формируем сильные и успешные команды разработчиков.'
    }
  ]
}
