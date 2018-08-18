import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

let httpTestingController;
let service;

describe('CoursesService', () => {
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
      const mockCourse = {
        name: 'Chessable',
        description: 'Space repetition to learn chess'
      };

      service.addCourse({topicId: 1})
        .subscribe(courseData => {
          expect(courseData.name).toEqual('Chessable');
        });

      const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');

      expect(req.request.method).toEqual('POST');

      req.flush(mockCourse);
    });
  });

  describe('#getCoursesByTopic', () => {
    it('should return Observable<any>', () => {
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

      const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');

      req.flush(mockCourses);
    });
  });
});
