import { Component, input } from '@angular/core';

@Component({
  selector: 'app-block',
  imports: [],
  templateUrl: './block.html',
  styleUrl: './block.scss',
})
export class Block {
  title = input<string | null>(null)
}
