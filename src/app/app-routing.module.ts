import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowTeachersComponent } from './teacher/show-teachers/show-teachers.component';
import { AddEditTeacherComponent } from './teacher/add-edit-teacher/add-edit-teacher.component';

const routes: Routes = [
  { path: 'show-teacher', component: ShowTeachersComponent },
  { path: 'add-edit-teacher', component: AddEditTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
