import { TestBed, inject } from '@angular/core/testing';
import { CoursesService } from './courses.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

let httpClient;
let httpTestingController;
let service;

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Tests:
  // 1. addCourse()
  // 2. getCoursesByTopic() => la info del topic.id la tiene el TopicComponent, q es donde paso el param en el routing, igual pensar el test
  describe('#addCourse()', () => {
    it('should return Observable<any>', () => {
      // const topicId = 1;

      const mockCourse = {
        name: 'Chessable',
        description: 'Space repetition to learn chess'
      };

      service.addCourse()
        .subscribe(courseData => {
          expect(courseData.name).toEqual('Chessable');
        });

      const req = httpTestingController.expectOne('http://localhost:8089/{{topicId}}/1/courses');

      expect(req.request.method).toEqual('POST');

      req.flush(mockCourse);

      httpTestingController.verify();
    });
  });
});
