import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseDialogComponent } from '../app/course-dialog/course-dialog.component';
import { Observable } from 'rxjs';

// TODO: change this and make it autoincrement in Spring Boot
// let id: Number = 0;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

   addCourse(course: CourseDialogComponent): Observable<CourseDialogComponent> {
     // Id needs to be handled
     return this.http.post<CourseDialogComponent>('/topics/1/courses', course);
   }
}
