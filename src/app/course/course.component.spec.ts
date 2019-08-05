import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { CourseComponent } from './course.component';
import { ActivatedRouteStub } from './act-route-stub.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  const loadCoursesMock = [
    { name: 'Chessable', description: 'space rep' },
    { name: 'Chess24', description: 'awesome platform' }
  ];

  const MockCoursesService = jasmine.createSpyObj(['getCoursesByTopic', 'deleteCourse']);
  // const MockCoursesService = {
  //   getCoursesByTopic: jasmine.createSpy('getCoursesByTopic').and.returnValue(of(loadCoursesMock))
  // };

  const MockActRoute = {
    paramMap: of(
      {  get: () => '1' }
    )
    // paramMap: of(convertToParamMap({id: '1'}))
  };

  const courseDataDialog = {
    topicId: 1,
    id: 1
  };

  const MockMatDialog = {
    // open: () => {}
    open: jasmine.createSpy('open')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseComponent ],
      providers: [
        { provide: CoursesService, useValue: MockCoursesService },
        { provide: ActivatedRoute, useValue: MockActRoute },
        // { provide: ActivatedRoute, useValue: new ActivatedRouteStub({ id: '1' }) },
        { provide: MatDialog, useValue: MockMatDialog }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    MockCoursesService.getCoursesByTopic.and.returnValue(of(loadCoursesMock));

    it('should call loadCourses with actRoute param', () => {
      component.ngOnInit();
      // fixture.detectChanges();

      expect(component.courses.length).toBe(2);
    });
  });

  describe('#loadCourses', () => {
    it('should get courses by topic id', () => {
      expect(component.courses.length).toBe(0);
      MockCoursesService.getCoursesByTopic.and.returnValue(of(loadCoursesMock));

      component.loadCourses(1);

      expect(component.courses.length).toBe(2);
    });
  });

  describe('#deleteCourse', () => {
    // Incomplete implementation
    it('should call deleteCourse funct on coursesService', () => {
      MockCoursesService.deleteCourse.and.returnValue(of('deleted'));

      component.deleteCourse({ name: 'nonsense' });

      expect(MockCoursesService.deleteCourse).toHaveBeenCalledWith({ name: 'nonsense' });
    });
  });

  describe('#openCourseUpdateDialog', () => {
    it('should open dialog', () => {
      component.openCourseUpdateDialog(courseDataDialog);

      expect(MockMatDialog.open).toHaveBeenCalled();
    });
  });
});
