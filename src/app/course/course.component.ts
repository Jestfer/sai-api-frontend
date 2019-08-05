import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CourseUpdateDialogComponent } from '../course-update-dialog/course-update-dialog.component';

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

  form: FormGroup;

  constructor(
    private courseService: CoursesService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obs2$ = this.actRoute.paramMap
      .subscribe(
        (params: Params): void => {
          this.loadCourses(params.get('id'));
        }
      );
  }

  loadCourses(id: any) {
    this.obs$ = this.courseService.getCoursesByTopic(id)
      .subscribe((data: any) => {
        this.courses = data;
      });
  }

  openCourseUpdateDialog(course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      courseData: {
        topicId: course.topic_id,
        id: course.id
      }
    };

    this.dialog.open(CourseUpdateDialogComponent, dialogConfig);
  }

  deleteCourse(course) {
    this.courseService.deleteCourse(course).subscribe(response => {
      // Notificar al usuario con esta respuesta de alguna forma
      console.log('borrado', response);
    });
  }

  ngOnDestroy(): void {
    if (this.obs$) {
      this.obs$.unsubscribe();
    }

    if (this.obs2$) {
      this.obs2$.unsubscribe();
    }
  }
}
