import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes, { useHash: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
