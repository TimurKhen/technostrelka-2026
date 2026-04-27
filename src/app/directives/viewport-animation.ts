import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core'

@Directive({
  selector: '[appViewportAnimation]'
})
export class ViewportAnimationDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0')
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.5s ease-in-out')

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(this.el.nativeElement, 'opacity', '1')
          this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)')
        }
      })
    }, { threshold: 0.1 })

    this.observer.observe(this.el.nativeElement)
  }

  ngOnDestroy() {
    this.observer?.disconnect()
  }
}
