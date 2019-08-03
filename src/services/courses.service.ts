import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private topics: any[] = [];
  private obs$ = new BehaviorSubject<any>(this.topics);

  constructor(private http: HttpClient) { }

  getCoursesByTopic(topicId: any): BehaviorSubject<any> {
    if (!this.topics.length) {
      this.http.get(`http://localhost:8000/topics/${topicId}/courses`)
        .subscribe(
          (topicsData: any) => {
            this.topics = topicsData;
            this.obs$.next(this.topics);

            this.resetCoursesEmitter();
          }
        );
    }

    return this.obs$;
  }

  refresh(topicId): void {
    this.topics = [];
    this.getCoursesByTopic(topicId);
  }

  // Si no reseteamos el Subject, emitimos el valor que tenia anteriormente directamente xk hacemos un return
  // Entonces hasta que no haga el .next del proximo Topic, esa pagina tendra los valores del topic anterior
  // Por eso hace el flicker y demas!
  resetCoursesEmitter(): void {
    this.topics = [];
    this.obs$ = new BehaviorSubject<any>(this.topics);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/topics/${course.topicId}/courses`, course);
  }

  updateCourse(course: any): Observable<any> {
    return this.http.put(`http://localhost:8000/topics/${course.courseData.topicId}/courses/${course.courseData.id}`, course);
  }

  deleteCourse(course: any): Observable<any> {
    return this.http.delete(`http://localhost:8000/topics/${course.topic_id}/courses/${course.id}`);
  }
}
