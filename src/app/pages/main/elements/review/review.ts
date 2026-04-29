import { Component, inject, OnInit, signal } from '@angular/core';
import { Block } from "../../../../components/block/block";
import { RatingService } from '../../../../services/api/rating/rating';

@Component({
  selector: 'app-review',
  imports: [Block],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review implements OnInit {
  private rateService = inject(RatingService)
  currentRating = signal<number>(5)

  ngOnInit() {
    this.getCurrentRating()
  }

  getCurrentRating() {
    this.rateService.getReviews().subscribe((val) => {
      this.currentRating.set(val.average)
    })
  }

  transformValue(value: number): number {
    if (Number.isInteger(value)) {
      return value
    }

    return Number(value.toFixed(1))
  }

}
