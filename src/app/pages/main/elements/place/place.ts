import { Component } from '@angular/core';
import { Block } from "../../../../components/block/block";
import { Map } from "./map/map";

@Component({
  selector: 'app-place',
  imports: [Block, Map],
  templateUrl: './place.html',
  styleUrl: './place.scss',
})
export class Place {

}
