import { RatingService } from './../../services/api/rating/rating';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { ViewportAnimationDirective } from '../../directives/viewport-animation';
import { NgClass, ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Ability {
  name: string;
  link?: string;
  icon?: string;
  target?: string;
}

const coworkingSpaceLink = 'https://sberfriend.sberbank.ru/sberfriend/#/application/A51020482C6E4BFDE05323C6440AA466/RU%2F52%2F416?typeObject=CONFRM_V2&tabValue=list'
const sportHallLink = 'https://sberfriend.sberbank.ru/sberfriend/#/application/A51020482C6E4BFDE05323C6440AA466/RU%2F52%2F416?typeObject=SERVICE&tabValue=list&timeZone=&city=%D0%B3+%D0%9D%D0%B8%D0%B6%D0%BD%D0%B8%D0%B9+%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4&categories=000001'

@Component({
  selector: 'app-center',
  imports: [WhatWillBe, LifeIn, Popup, ReviewCreate,
    Review, MatBottomSheetModule, RatingComponent,
    ViewportAnimationDirective, NgClass],
  templateUrl: './center.html',
  styleUrl: './center.scss',
})
export class Center implements OnInit {
  private _bottomSheet = inject(MatBottomSheet)
  private rateService = inject(RatingService)

  private scroller = inject(ViewportScroller)
  private route = inject(ActivatedRoute)

  abilities: Ability[] = [
    { name: 'программа лояльности', link: '../loyality', icon: './icons/strelka.svg', target: '_self' },
    { name: 'снеки' },
    { name: 'массажное кресло' },
    { name: 'спортзал', link: sportHallLink, icon: './icons/strelka.svg' },
    { name: 'забронировать коворкинг', link: coworkingSpaceLink, icon: './icons/strelka.svg', target: '_blank' },
    { name: 'обучения' },
    { name: 'забронировать переговорну зону', link: coworkingSpaceLink, icon: './icons/strelka.svg', target: '_blank' },
    { name: 'удобное расположение' }
  ]

  photos = ['1', '2', '3', '4']
  isRated = signal<boolean>(false)
  selectedPhoto = signal<string | null>(null)
  rating = signal<number>(5)
  currentStars = signal<number>(0)

  ngOnInit(): void {
    this.getReviews();
    const rated = localStorage.getItem('user-rated');
    if (rated) {
      this.isRated.set(true);
    }

    this.route.fragment.subscribe(frag => {
      if (frag) {
        setTimeout(() => {
          this.scroller.scrollToAnchor(frag)

          document.getElementById(frag)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 250)
      }
    })
  }

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

    sheetRef.instance.closeForm.subscribe((v: [number, boolean]) => {
      this.currentStars.set(v[0])
      this.closeBottomSheet()
      if (v[1]) {
        this.isRated.set(true)
      }
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
      this.reviews.set(val.reviews)
      this.rating.set(val.average)
    })
  }
}
