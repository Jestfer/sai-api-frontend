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

  constructor(private http: HttpClient) { }

   addCourse(course: any): Observable<CourseDialogComponent> {
     this.courseData = this.http.post<CourseDialogComponent>(`http://localhost:8089/topics/${course.topicId}/courses`, course);
     return this.courseData;
   }
}
