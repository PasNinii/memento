import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from './errors/error.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnchorComponent } from './shell/anchor.component';

@NgModule({
  declarations: [AnchorComponent, ErrorComponent, ShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  exports: [ShellComponent],
})
export class SharedModule {}
