import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-update-dialog.component.html',
  styleUrls: ['./course-update-dialog.component.css']
})

export class CourseUpdateDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseUpdateDialogComponent>,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public courseData: any
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl(),
      description: new FormControl()
    });
  }

  mergeIdsAndCourseData(source, target) {
    return Object.assign(source, target);
  }

  update() {
    this.dialogRef.close(this.form.value);

    this.courseService.updateCourse(this.mergeIdsAndCourseData(this.courseData, this.form.value))
      .subscribe(() => {
        this.courseService.refresh(this.courseData.courseData.topicId);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
