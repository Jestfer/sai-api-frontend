import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseDialogComponent } from '../app/course-dialog/course-dialog.component';
import { Observable } from 'rxjs';

// NOT NEEDED, just maybe if the server requires authentication tokens to post, or similar
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courseData: any;

  constructor(private http: HttpClient) {
    this.addCourse(this.courseData);
   }

   addCourse(course: CourseDialogComponent): Observable<CourseDialogComponent> {
     // Id needs to be handled
     this.courseData = this.http.post<CourseDialogComponent>('http://localhost:8089/topics/1/courses', course);
     return this.courseData;
   }
}
