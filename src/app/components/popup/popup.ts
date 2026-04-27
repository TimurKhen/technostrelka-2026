import { Component, input, output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  animations: [
    trigger('simpleFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class Popup {
  isShow = input<boolean>(false)
  close = output<void>()

  onClose() { this.close.emit() }
}
