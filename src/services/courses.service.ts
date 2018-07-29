import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

   addCourse(course: any): Observable<any> {
     return this.http.post<any>(`http://localhost:8089/topics/${course.topicId}/courses`, course);
   }

   getCourses(topicId: any) {
     return this.http.get(`http://localhost:8089/topics/${topicId}/courses`);
   }
}
