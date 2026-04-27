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
    setTimeout(() => this.adjustFontSize(), 100);
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

  private adjustFontSize() {
    const element = this.currentAbility.nativeElement;
    const container = element.parentElement;

    if (!element || !container) return;

    // Сбрасываем на базовый размер
    element.style.fontSize = this.baseFontSize + 'em';

    // Даем браузеру время применить стили
    requestAnimationFrame(() => {
      const containerHeight = container.clientHeight - 20; // Небольшой отступ
      const textHeight = element.scrollHeight;

      if (textHeight > containerHeight) {
        // Вычисляем необходимый размер
        const ratio = containerHeight / textHeight;
        let newSize = this.baseFontSize * ratio;

        // Применяем ограничения
        newSize = Math.max(this.minFontSize, newSize);
        newSize = Math.min(this.baseFontSize, newSize);

        element.style.fontSize = newSize + 'em';
      }
    });
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

      // Настраиваем размер шрифта
      this.adjustFontSize();

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
