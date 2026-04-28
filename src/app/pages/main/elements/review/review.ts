import { Component, inject, signal } from '@angular/core';
import { Block } from "../../../../components/block/block";
import { RatingService } from '../../../../services/api/rating/rating';

@Component({
  selector: 'app-review',
  imports: [Block],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  private rateService = inject(RatingService)

  currentRating = signal<number>(5)

  getCurrentRating() {
    this.rateService.getRating().subscribe((val) => {
      this.currentRating.set(val)
    })
  }
}
