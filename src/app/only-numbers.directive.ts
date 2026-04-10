import { DOCUMENT } from '@angular/common';
import { Directive, HostBinding, HostListener, Inject } from '@angular/core';

@Directive({
  selector: '[onlyNumbers]'
})
export class OnlyNumbersDirective {
  @HostBinding('autocomplete') public autocomplete;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.autocomplete = 'off'
  }

  @HostListener('keypress', ['$event']) public disableKeys(e: any) {
    this.document.all ? e.keyCode : e.keyCode
    return e.keyCode == 8 || e.keyCode == 46 || (e.keyCode >= 48 && e.keyCode <= 57)
  }
}
