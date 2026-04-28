import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Block } from "../../../../components/block/block";

@Component({
  selector: 'app-able',
  imports: [Block],
  templateUrl: './able.html',
  styleUrl: './able.scss',
})
export class Able implements AfterViewInit, OnDestroy {
  @ViewChild('currentAbility') currentAbility!: ElementRef;

  title = 'Возможности центра';

  abilities: string[] = [
    'Снеки',
    'Кофе',
    'Массажное кресло',
    'Спортзал',
    'Коворкинг',
    'Обучения',
    'Переговорные зоны',
    'Удобное расположение'
  ];

  currentIndex = 0;
  private intervalId: any;
  private isAnimating = false;

  private readonly baseFontSize = 1.4;
  private readonly minFontSize = 0.7;

  ngAfterViewInit() {
    this.startRotation();
  }

  ngOnDestroy() {
    this.stopRotation();
  }

  private startRotation() {
    this.intervalId = setInterval(() => {
      this.changeAbility();
    }, 2000);
  }

  private stopRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private changeAbility() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const element = this.currentAbility.nativeElement;

    // Убираем возможные предыдущие классы анимации
    element.classList.remove('fade-in-up');

    // Добавляем анимацию ухода вверх
    element.classList.add('fade-out-up');

    // Ждем завершения анимации ухода
    setTimeout(() => {
      // Меняем текст
      this.currentIndex = (this.currentIndex + 1) % this.abilities.length;
      element.textContent = this.abilities[this.currentIndex];

      // Меняем анимацию на появление
      element.classList.remove('fade-out-up');
      element.classList.add('fade-in-up');

      // Очищаем классы после завершения
      setTimeout(() => {
        element.classList.remove('fade-in-up');
        this.isAnimating = false;
      }, 600);
    }, 400);
  }
}
