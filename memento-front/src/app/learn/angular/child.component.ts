import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-component',
  template: ` {{ settings | json }} `,
})
export class ChildComponent implements OnInit {
  @Input() settings: any;

  ngOnInit(): void {
    setInterval(() => {
      this.settings.id++;
      this.settings.task += `${this.settings.id}`;
      this.settings.nested.name += `${this.settings.id}`;
    }, 1000);
  }
}
