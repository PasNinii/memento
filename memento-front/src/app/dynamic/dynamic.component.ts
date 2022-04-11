import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomComponentDirective } from '../shared/directives/custom-component.directive';
import { ComponentEnum, Config, MockConfig } from '../shared/model/interface';

@Component({
  template: `
    <section fxLayout="column" fxLayoutAlign="center center">
      <ng-template appCustomComponent></ng-template>
    </section>
  `,
})
export class DynamicComponent implements OnInit {
  @ViewChild(CustomComponentDirective, { static: true })
  custom!: CustomComponentDirective;

  public config: Config = MockConfig;

  constructor() {}

  ngOnInit(): void {
    const viewContainerRef = this.custom.viewContainerRef;

    for (let component of this.config.components) {
      const componentRef = viewContainerRef.createComponent<any>(
        this.getComponent(component.type)
      );

      componentRef.instance.component = component;
    }
  }

  getComponent(type: string): any {
    switch (type) {
      case ComponentEnum.SIMPLE_TABLE.name:
        return ComponentEnum.SIMPLE_TABLE.type;

      default:
        return null;
    }
  }
}
