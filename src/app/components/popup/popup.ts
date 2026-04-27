import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
})
export class Popup {
  isShow = input<boolean>(false)

  close = output<void>()

  onClose() {
    this.close.emit()
  }
}
