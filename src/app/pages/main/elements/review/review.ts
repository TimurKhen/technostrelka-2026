import { Component } from '@angular/core';
import { Block } from "../../../../components/block/block";

@Component({
  selector: 'app-review',
  imports: [Block],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  currentRating = 5
}
