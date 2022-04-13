import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  elements: any[] = [
    { name: 'A', position: 'left' },
    { name: 'C', position: 'left' },
    { name: 'D', position: 'left' },
    { name: 'F', position: 'left' },
    { name: 'E', position: 'right' },
    { name: 'B', position: 'right' },
    { name: 'G', position: 'right' },
  ];
}
