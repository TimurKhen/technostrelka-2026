import { Component, inject } from '@angular/core';
import { Block } from "../../components/block/block";
import { Place } from "./elements/place/place";
import { Start } from "./elements/start/start";
import { Able } from "./elements/able/able";
import { LifeIn } from "./life-in/life-in";
import { WhatWillBe } from "./elements/what-will-be/what-will-be";
import { Contacts } from "./elements/contacts/contacts";
import { Faq } from "./elements/faq/faq";
import { Review } from "./elements/review/review";
import { ViewportAnimationDirective } from '../../directives/viewport-animation';

@Component({
  selector: 'app-main',
  imports: [Block,
    Place, Start, Able, LifeIn,
    WhatWillBe, Contacts, Faq, Review,
    ViewportAnimationDirective
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
}
