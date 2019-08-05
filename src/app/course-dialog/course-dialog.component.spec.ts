import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDialogComponent } from './course-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TopicsService } from 'src/services/topics.service';
import { CoursesService } from '../../services/courses.service';
import { of } from 'rxjs';

describe('CourseDialogComponent', () => {
  let component: CourseDialogComponent;
  let fixture: ComponentFixture<CourseDialogComponent>;

  const MockTopicsService = {
    getTopics: jasmine.createSpy('getTopics').and.returnValue(of(['fakerino']))
  };

  const MockCoursesService = {
    addCourse: jasmine.createSpy('addCourse').and.returnValue(of(null))
  };

  const MockDialogRef = {
    close: jasmine.createSpy('close')
  };

  // https://medium.com/@charlesprobaker/karma-testing-a-formgroup-instance-a0a90de831d4
  const fbMock: FormBuilder = new FormBuilder();

  const formVal = {
    topicId: 1,
    name: 'Chess',
    description: 'Chess courses'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDialogComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: fbMock },
        { provide: MatDialogRef, useValue: MockDialogRef },
        { provide: TopicsService, useValue: MockTopicsService },
        { provide: CoursesService, useValue: MockCoursesService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#ngOnInit should have an undefined form value from group with 3 controls
     and we should get topicsData`, () => {
      fbMock.group({ topicId: null, name: null, description: null });

      fixture.detectChanges();

      expect(component.topics).toEqual(['fakerino']);
      expect(component.form.controls.topicId.value).toBe(null);
      expect(component.form.controls.name.value).toBe(null);
      expect(component.form.controls.description.value).toBe(null);
  });

  it(`#save should call dialogRef.close and courseService.addcourse with form val
      and courses response should be assigned to comp courses`, () => {
    component.form = fbMock.group(formVal);

    component.save();

    expect(MockDialogRef.close).toHaveBeenCalledWith(formVal);
    expect(MockCoursesService.addCourse).toHaveBeenCalledWith(formVal);

    // response from service
    expect(component.courses).toEqual([null]);
  });

  it('#close func should close dialogRef', () => {
    component.close();

    expect(MockDialogRef.close).toHaveBeenCalled();
  });
});
