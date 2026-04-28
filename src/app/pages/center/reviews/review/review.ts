import { Component, input } from '@angular/core';
import { ReviewInterface } from '../../../../interfaces/review/review';
import { TimeAgoPipe } from "../../../../pipes/time-ago/time-ago-pipe.pipe";
import { RatingComponent } from "../../../../components/rating/rating.component";

@Component({
  selector: 'app-review',
  imports: [TimeAgoPipe, RatingComponent],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  review = input<ReviewInterface>()
}
