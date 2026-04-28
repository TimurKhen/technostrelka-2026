import { NgClass } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { MenuOpenerComponent } from "./menu-opener/menu-opener.component";
import { MobileNavigation } from "../mobile-navigation/mobile-navigation";

@Component({
  selector: 'app-navigation',
  imports: [NgClass, MenuOpenerComponent, MobileNavigation],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  isNavVisible: boolean = true;
  private lastScrollTop: number = 0;
  isMenuOpen = signal<boolean>(false)

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      this.isNavVisible = false;
    } else if (currentScroll < this.lastScrollTop) {
      this.isNavVisible = true;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  isOpenChange($event: boolean) {
    this.isMenuOpen.set($event)
  }
}
