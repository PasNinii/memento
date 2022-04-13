import { Component } from '@angular/core';
import { Config, MockConfig } from '../shared/model/interface';

@Component({
  template: `
    <div class="root-container">
      <mat-grid-list [cols]="config.cols" [rowHeight]="config.rowh" [gutterSize]="config.size">
        <mat-grid-tile
          class="component-container"
          *ngFor="let component of config.components"
          [rowspan]="component.rows"
          [colspan]="component.cols"
        >
          <ng-container [ngSwitch]="component.type">
            <ng-template ngSwitchCase="SIMPLE_TABLE">
              <app-simple-table [component]="component"></app-simple-table>
            </ng-template>
          </ng-container>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  public config: Config = MockConfig;
}
