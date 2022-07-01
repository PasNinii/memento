import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BuilderComponent } from './builders/builder.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableModule } from './components/table/table.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import {
  defaultDataServiceConfig,
  entityConfig,
} from './store/entity-metadata';

@NgModule({
  declarations: [AppComponent],
  imports: [
    /**
     * Angular module
     */
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'page/:pagename', component: BuilderComponent },
    ]),

    /**
     * Angular Material Module
     */

    /**
     * App module
     */
    SharedModule,
    TableModule,

    /**
     * Standalone Component
     */
    BuilderComponent,
    SpinnerComponent,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
