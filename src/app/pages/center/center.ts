import { Component, signal } from '@angular/core';
import { WhatWillBe } from "../main/elements/what-will-be/what-will-be";
import { LifeIn } from "../main/life-in/life-in";
import { Popup } from "../../components/popup/popup";

interface Ability {
  name: string;
  link?: string;
  icon?: string;
}

@Component({
  selector: 'app-center',
  imports: [WhatWillBe, LifeIn, Popup],
  templateUrl: './center.html',
  styleUrl: './center.scss',
})
export class Center {
  abilities: Ability[] = [
    { name: 'программа лояльности' },
    { name: 'снеки' },
    { name: 'массажное кресло' },
    { name: 'спортзал' },
    { name: 'забронировать коворкинг', link: 'https://localhost:8081', icon: './icons/strelka.svg' },
    { name: 'обучения' },
    { name: 'переговорные зоны' },
    { name: 'удобное расположение' }
  ]

  photos = ['1', '2', '3', '4']

  selectedPhoto = signal<string | null>(null)

  openPhoto(photo: string) {
    this.selectedPhoto.set(photo)
  }

  closePhoto() {
    this.selectedPhoto.set(null)
  }
}
