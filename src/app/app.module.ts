import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Custom components
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseUpdateDialogComponent } from './course-update-dialog/course-update-dialog.component';
import { TopicDialogComponent } from './topic-dialog/topic-dialog.component';
import { CourseComponent } from './course/course.component';
import { TopicsComponent } from './topics/topics.component';

// Custom services
import { TopicsService } from '../services/topics.service';
import { CoursesService } from '../services/courses.service';

const appRoutes: Routes = [
  { path: '', component: TopicsComponent },
  { path: 'courses/:id', component: CourseComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CourseDialogComponent,
    CourseUpdateDialogComponent,
    TopicDialogComponent,
    CourseComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FormBuilder,
    TopicsService,
    CoursesService,
    HttpClient
  ],
  bootstrap: [AppComponent],
  entryComponents: [CourseDialogComponent, TopicDialogComponent, CourseUpdateDialogComponent]
})
export class AppModule { }
