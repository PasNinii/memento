import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appComponent]',
})
export class CustomComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
