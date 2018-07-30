import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnDestroy, OnInit {
  courses: any = [];
  topicId$: number;
  imgUrl: String = 'https://source.unsplash.com/800x600/?';

  private obs$: Subscription = null;
  private obs2$: Subscription = null;

  constructor(private courseService: CoursesService, private actRoute: ActivatedRoute) { }

  // Usamos observables distintos, por eso 2 subscribe
  loadCourses(id: any) {
    // le asignamos el observable que vamos a destruir al subscriptor
    this.obs$ = this.courseService.getCoursesByTopic(id)
      .subscribe((data: any ) => {
        this.courses = data;
      });
  }

  ngOnInit() {
    this.obs2$ = this.actRoute.paramMap
      .subscribe(
        (params: Params): void => {
          this.loadCourses(params.get('id'));
        }
      );
  }

  ngOnDestroy(): void {
    this.obs$.unsubscribe();
    this.obs2$.unsubscribe();
  }
}
