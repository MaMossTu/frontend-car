import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'document-page',
  templateUrl: './document-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentPageComponent {
  /**
   * Constructor
   */
  constructor() {

  }
}
