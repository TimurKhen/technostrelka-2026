import { RatingService } from './../../services/api/rating/rating';
import { Component, inject, signal } from '@angular/core';
import { WhatWillBe } from "../main/elements/what-will-be/what-will-be";
import { LifeIn } from "../main/life-in/life-in";
import { Popup } from "../../components/popup/popup";
import { ReviewCreate } from "./reviews/review-create/review-create";
import { Review } from "./reviews/review/review";
import { ReviewInterface } from '../../interfaces/review/review';

import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { RatingComponent } from "../../components/rating/rating.component";

interface Ability {
  name: string;
  link?: string;
  icon?: string;
}

const coworkingSpaceLink = 'https://sberfriend.sberbank.ru/sberfriend/#/application/A51020482C6E4BFDE05323C6440AA466/RU%2F52%2F416?typeObject=CONFRM_V2&tabValue=list'

@Component({
  selector: 'app-center',
  imports: [WhatWillBe, LifeIn, Popup, ReviewCreate, Review, MatBottomSheetModule, RatingComponent],
  templateUrl: './center.html',
  styleUrl: './center.scss',
})
export class Center {
  private _bottomSheet = inject(MatBottomSheet)
  private rateService = inject(RatingService)

  abilities: Ability[] = [
    { name: 'программа лояльности' },
    { name: 'снеки' },
    { name: 'массажное кресло' },
    { name: 'спортзал' },
    { name: 'забронировать коворкинг', link: coworkingSpaceLink, icon: './icons/strelka.svg' },
    { name: 'обучения' },
    { name: 'забронировать переговорну зону', link: coworkingSpaceLink, icon: './icons/strelka.svg' },
    { name: 'удобное расположение' }
  ]

  photos = ['1', '2', '3', '4']
  selectedPhoto = signal<string | null>(null)
  rating = signal<number>(5)
  currentStars = signal<number>(0)

  openPhoto(photo: string) {
    this.selectedPhoto.set(photo)
  }

  closePhoto() {
    this.selectedPhoto.set(null)
  }

  reviews = signal<ReviewInterface[]>([])

  openBottomSheet(value: number): void {
    const sheetRef = this._bottomSheet.open(ReviewCreate)

    sheetRef.instance.currentStars.set(value)

    sheetRef.instance.closeForm.subscribe((v: number) => {
      this.currentStars.set(v)
      this.closeBottomSheet()
    })
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss()
  }

  rate($event: number) {
    this.openBottomSheet($event)
  }

  getReviews() {
    this.rateService.getReviews().subscribe((val) => {
      this.reviews.set(val)
    })
  }
}
