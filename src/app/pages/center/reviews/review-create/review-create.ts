import { Component, ElementRef, inject, input, OnChanges, output, signal, SimpleChanges, viewChild } from '@angular/core';
import { RatingComponent } from "../../../../components/rating/rating.component";
  import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgClass } from '@angular/common';
import { RatingService } from '../../../../services/api/rating/rating';

@Component({
  selector: 'app-review-create',
  imports: [ReactiveFormsModule, RatingComponent, MatFormFieldModule,
    MatInputModule, FormsModule, NgClass],
  templateUrl: './review-create.html',
  styleUrl: './review-create.scss',
})
export class ReviewCreate {
  private ratingService = inject(RatingService)
  maxLength = 250
  closeForm = output<number>()

  reviewForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)
  })
  currentStars = signal<number>(0)

  starsChange(newStars: number) {
    this.currentStars.set(newStars)
  }

  publish($event: Event) {
    $event.preventDefault()

    const formValues = this.reviewForm.value

    this.ratingService.rate(
      {
        username: formValues.username!,
        email: formValues.email!,
        comment: formValues.comment!,
        mark: this.currentStars()
      }
    ).subscribe(() => {
      this.close(undefined)
    })
  }

  close($event: Event | undefined) {
    if ($event) $event.preventDefault()
    this.closeForm.emit(this.currentStars())
  }
}
