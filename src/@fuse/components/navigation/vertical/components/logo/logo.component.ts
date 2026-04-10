import { Component, Input, OnInit } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';

@Component({
  selector: 'vertical-navigation-logo-item',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class VerticalNavigationLogoComponent implements OnInit {

  @Input() item: FuseNavigationItem;
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {}

}
