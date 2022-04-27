import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { environment as env, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { DynamicModule } from './dynamic/dynamic.module';
import { GamesModule } from './games/games.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ChildComponent } from './learn/angular/child.component';
import { ParentComponent } from './learn/angular/parent.component';
import { LearnModule } from './learn/learn.module';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { SharedModule } from './shared/shared.module';
import { defaultDataServiceConfig, entityConfig } from './store/entity-metadata';

const config: SocketIoConfig = {
  url: environment.serverUrl,
  options: {},
};

@NgModule({
  declarations: [AppComponent, HomePageComponent, HighlightDirective, ParentComponent, ChildComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    ComponentsModule,
    LearnModule,
    DynamicModule,
    GamesModule,
    FormsModule,
    MatInputModule,
    SocketIoModule.forRoot(config),
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [
          {
            uri: `${env.serverUrl}/*`,
          },
        ],
      },
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
