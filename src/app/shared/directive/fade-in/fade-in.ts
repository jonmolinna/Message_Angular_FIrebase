import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[fadeIn]',
})
export class FadeIn implements OnInit {
  @Input() fadeInDuration: string = '0.5s';
  @Input() fadeInDelay: string = '0s';

  private elementRef: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;

    // Aplicar estilos iniciales
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity ${this.fadeInDuration} ease-in-out ${this.fadeInDelay}, transform ${this.fadeInDuration} ease-in-out ${this.fadeInDelay}`;

    // Trigger de la animación
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  }
}
