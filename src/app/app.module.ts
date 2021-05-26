import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './core/message/message.component';


import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShowTeachersComponent } from './teacher/show-teachers/show-teachers.component';
import { AddEditTeacherComponent } from './teacher/add-edit-teacher/add-edit-teacher.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ShowTeachersComponent,
    AddEditTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
