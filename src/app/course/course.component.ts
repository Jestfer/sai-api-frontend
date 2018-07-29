import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any = [];
  imgUrl: String = 'https://source.unsplash.com/800x600/?';

  constructor(private courseService: CoursesService) {
    this.courseService.getCourses(1)
      .subscribe((coursesData: Response) => {
        this.courses = coursesData;
      });
  }

  ngOnInit() {
  }

}
