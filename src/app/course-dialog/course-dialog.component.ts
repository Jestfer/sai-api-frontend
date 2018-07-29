import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CoursesService } from '../../services/courses.service';
import { TopicsService } from '../../services/topics.service';
import { Subscription } from '../../../node_modules/rxjs';

// TODO: change this and make it autoincrement in Spring Boot
let incrementId = 0;

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})

export class CourseDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private obs$: Subscription = null;
  topics: any = [];
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private topicsService: TopicsService,
    private course: CoursesService
  ) { }

  ngOnDestroy(): void {
    // Optimizar la memoria, la suscripción al observable del servicio se elimina
    this.obs$.unsubscribe();
  }

  ngOnInit() {
    this.obs$ = this.topicsService.getTopics()
      .subscribe((topicsData: Response) => {
        this.topics = topicsData;
      });

    this.form = this.fb.group({
      id: incrementId += 1,
      name: new FormControl(),
      description: new FormControl()
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
    this.course.addCourse(this.form.value)
      .subscribe(newCourse => this.courses.push(newCourse));
  }

  close() {
    this.dialogRef.close();
  }
}
