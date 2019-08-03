import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let httpTestingController;
let service;

describe('CoursesService', () => {
  const mockCourse = {
    name: 'Chessable',
    description: 'Space repetition to learn chess'
  };

  const mockUpdateCourse = {
    name: 'Chessable',
    description: 'Space rep',
    courseData: {
      topicId: 1,
      id: 1
    }
  };

  const mockDeleteCourse = {
    name: 'Chessable',
    description: 'Space rep',
    topic_id: 1,
    id: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addCourse()', () => {
    it('should return Observable<any>', () => {
      service.addCourse({topicId: 1})
        .subscribe(courseData => {
          expect(courseData.name).toEqual('Chessable');
        });

      const req = httpTestingController.expectOne('http://localhost:8000/topics/1/courses');

      expect(req.request.method).toEqual('POST');

      req.flush(mockCourse);
    });
  });

  describe('#getCoursesByTopic', () => {
    xit('should return Observable<any>', () => {
      const mockCourses = [
        { name: 'Chessable', description: 'Space repetition to learn chess' },
        { name: 'ICC', description: 'Play chess online' }
      ];

      service.getCoursesByTopic(1)
        .subscribe(coursesData => {
          expect(coursesData[0].name).toEqual('Chessable');
          expect(coursesData[0].description).toEqual('Space repetition to learn chess');
          expect(coursesData[1].name).toEqual('ICC');
          expect(coursesData[1].description).toEqual('Play chess online');
        });

      const req = httpTestingController.expectOne('http://localhost:8000/topics/1/courses');

      req.flush(mockCourses);
    });
  });

  describe('#updateCourse', () => {
    it('should return Observable<any>', () => {
      service.updateCourse(mockUpdateCourse).subscribe((course) => {
        expect(course.name).toEqual(mockUpdateCourse.name);
        expect(course.description).toEqual(mockUpdateCourse.description);
      });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:8000/topics/1/courses/1',
        method: 'PUT'
      });
      req.flush(mockUpdateCourse);
    });
  });

  describe('#deleteCourse', () => {
    it('should return Observable<any>', () => {
      service.deleteCourse(mockDeleteCourse).subscribe((course) => {
        expect(course.name).toEqual(mockDeleteCourse.name);
        expect(course.description).toEqual(mockDeleteCourse.description);
      });

      const req = httpTestingController.expectOne({
        url: 'http://localhost:8000/topics/1/courses/1',
        method: 'DELETE'
      });
      req.flush(mockDeleteCourse);
    });
  });

  describe('#refresh', () => {
    it('should reset courses array (wrongly named)', () => {
      service.refresh();

      // There is an open req, so we know it's resetted
      const req = httpTestingController.expectOne('http://localhost:8000/topics/undefined/courses');
    });
  });
});
