import { Component, signal, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from "./components/navigation/navigation";
import { AlertService } from './services/ui/alert/alert.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('technostrelka-2026')

  constructor(
    private alertService: AlertService,
    private vcr: ViewContainerRef
  ) {
    this.alertService.setContainer(this.vcr)
  }
}
