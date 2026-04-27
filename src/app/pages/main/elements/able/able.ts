import { Component, ElementRef, ViewChild } from '@angular/core';
import { Block } from "../../../../components/block/block";

@Component({
  selector: 'app-able',
  imports: [Block],
  templateUrl: './able.html',
  styleUrl: './able.scss',
})
export class Able {
  @ViewChild('currentAbility') currentAbility: ElementRef | undefined
}
