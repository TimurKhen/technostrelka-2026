import { Component, input } from '@angular/core';
import { ReviewInterface } from '../../../../interfaces/review/review';
import { TimeAgoPipe } from "../../../../pipes/time-ago/time-ago-pipe.pipe";

@Component({
  selector: 'app-review',
  imports: [TimeAgoPipe],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  review = input<ReviewInterface>()
}
