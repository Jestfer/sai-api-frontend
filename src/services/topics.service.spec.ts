import { HttpClient } from '@angular/common/http';
// https://angular.io/guide/http#testing-http-requests
// Stackblitz example: https://stackblitz.com/angular/eaajdybomrjm
// The below lib makes HTTP backend mocking straightforward
// Pattern:
// 1- Req is made first
// 2- Then a test expects that certain reqs have or not been made and perform assertions against such reqs
// 3- Provides response by "flushing" each expected req
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Data } from '@angular/router';
import { TopicsService } from './topics.service';
import { of } from 'rxjs';

const testUrl = '/data';
const topicsUrl = 'http://localhost:8000/topics';
let httpClient;
let httpTestingController: HttpTestingController;
let service;

describe('TopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TopicsService
      ],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TopicsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('can test HttpClient get req', () => {
  //   const testData: Data = { name: 'Test Data' };

  //   httpClient.get(testUrl)
  //     .subscribe(data =>
  //       expect(data).toEqual(testData)
  //     );

  //   const req = httpTestingController.expectOne(testUrl);

  //   expect(req.request.method).toEqual('GET');

  //   req.flush(testData);
  // });

  // it('should issue a request', async(() => {
  //   httpClient.get('/foo/bar').subscribe();

  //   httpTestingController.expectOne({
  //     url: '/foo/bar',
  //     method: 'GET'
  //   });
  // }));

  describe('#getTopics()', () => {
    xit('should return a BehaviorSubject<any<Topic>>', () => {
      const mockResponse = of({
        name: 'Chess',
        description: 'My chess courses'
      });

      service.getTopics().subscribe(topicData => {
        console.log(topicData);

        expect(topicData.name).toEqual('Chess');
        expect(topicData.description).toEqual('My chess courses');
      });

      const req = httpTestingController.expectOne({
        url: topicsUrl,
        method: 'GET'
      });

      req.flush(mockResponse);
    });
  });

  describe('#addTopic()', () => {
    it('should return Observable<any>', () => {
      const mockResponse = {
          name: 'Coding',
          description: 'Best coding courses'
      };

      service.addTopic()
        .subscribe(topicData => {
          expect(topicData.name).toEqual('Coding');
          expect(topicData.description).toEqual('Best coding courses');
        });

      const req = httpTestingController.expectOne(topicsUrl);

      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
    });
  });

  // TODO: refresh() => depends on getTopics()
  describe('#refresh', () => {
    it('should reset topics array when called', () => {
      service.refresh();

      // Now there's a pending req, so topics reseted!
      const req = httpTestingController.expectOne(topicsUrl);
      req.flush(of({
        name: 'Chess',
        description: 'My chess courses'
      }));
    });
  });
});
