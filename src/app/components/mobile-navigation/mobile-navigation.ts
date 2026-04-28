import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MenuOpenerComponent } from "../navigation/menu-opener/menu-opener.component";

@Component({
  selector: 'app-mobile-navigation',
  imports: [CommonModule, MenuOpenerComponent],
  templateUrl: './mobile-navigation.html',
  styleUrl: './mobile-navigation.scss',
})
export class MobileNavigation {
  isShow = input<boolean>(false)
}
