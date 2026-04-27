import { Component } from '@angular/core';
import { Block } from "../../components/block/block";
import { Place } from "./elements/place/place";
import { Start } from "./elements/start/start";
import { Able } from "./elements/able/able";
import { LifeIn } from "./life-in/life-in";
import { WhatWillBe } from "./elements/what-will-be/what-will-be";
import { Contacts } from "./elements/contacts/contacts";

@Component({
  selector: 'app-main',
  imports: [Block, Place, Start, Able, LifeIn, WhatWillBe, Contacts],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
