import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {
  isLoaded = signal<boolean>(false)

  onLoad() {
    this.isLoaded.set(true)
  }
}
