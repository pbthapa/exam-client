import { Directive, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[bluecolored]'
})
export class BlueColorDirective {
    constructor(element: ElementRef) {
      element.nativeElement.style.color = 'blue';
    }
    
}