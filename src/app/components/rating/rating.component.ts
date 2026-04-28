import {ChangeDetectionStrategy, Component, inject, input, Input, OnChanges, output, signal, SimpleChanges} from '@angular/core';

import { SystemIconsStylesDirective } from '../../directives/system-icons-styles.directive';

@Component({
  selector: 'app-rating',
  imports: [
    SystemIconsStylesDirective
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnChanges {
  stars = [1, 2, 3, 4, 5]
  currentStarInput = input<number>(0)
  currentStar = signal<number>(0)
  starsCountChanged = output<number>()

  ngOnChanges(changes: SimpleChanges) {
    const value = changes["currentStarInput"]["currentValue"]
    if (value) {
      this.currentStar.set(value)
    } else {
      this.currentStar.set(0)
    }
  }

  changeCurrentStar(item: number) {
    this.currentStar.set(item)
    this.postStarData()
  }

  postStarData() {
    this.starsCountChanged.emit(this.currentStar())
  }
}
