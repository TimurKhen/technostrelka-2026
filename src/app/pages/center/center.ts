import { Component } from '@angular/core';
import { WhatWillBe } from "../main/elements/what-will-be/what-will-be";
import { LifeIn } from "../main/life-in/life-in";

@Component({
  selector: 'app-center',
  imports: [WhatWillBe, LifeIn],
  templateUrl: './center.html',
  styleUrl: './center.scss',
})
export class Center {
  abilities = ['программа лояльности', 'снеки', 'массажное кресло', 'спортзал', 'коворкинг', 'обучения', 'переговорные зоны', 'удобное расположение']


}
