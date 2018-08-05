import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
// https://angular.io/guide/http#testing-http-requests
// Stackblitz example: https://stackblitz.com/angular/eaajdybomrjm
// The below lib makes HTTP backend mocking straightforward
// Pattern:
// 1- Req is made first
// 2- Then a test expects that certain reqs have or not been made and perform assertions against such reqs
// 3- Provides response by "flushing" each expected req
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TopicsService } from './topics.service';
import { Data } from '@angular/router';

const testUrl = '/data';

describe('TopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TopicsService,
        HttpClient,
        HttpHandler,
        HttpClientTestingModule,
        HttpTestingController
      ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('can test HttpClient get req', inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
    const testData: Data = { name: 'Test Data'};

    // Make an HTTP GET req
    http.get<Data>(testUrl)
    .subscribe(data =>
      // When observable resolves, result should match testData
      expect(data).toEqual(testData)
    );

    // expectOne() will match req's URL, if not, expectOne() would throw
    const req = backend.expectOne('/data');

    // Assert that req is a GET
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve
    // Subscribe callback asserts that correct data was returned
    req.flush(testData);

    // Finally, we assert that there are no outstanding reqs
    backend.verify();
  }));

  xit('should issue a request',
    // 1. declare as async test since the HttpClient works with Observables
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        // 3. send a simple request
        http.get('/foo/bar').subscribe();

        // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
        // here two, it's significantly less boilerplate code needed to verify an expected request
        backend.expectOne({
          url: '/foo/bar',
          method: 'GET'
        });
      })
    ));
  });
  // describe('#getTopics()', () => {
  //   it('should be created', inject([TopicsService], (service: TopicsService) => {
  //     expect(service).toBeTruthy();
  //   }));

    // it('should return a BehaviourSubject<any<Topic>>',
    //   inject([TopicsService, ConnectionBackend], (service: TopicsService, mockBackend) => {

    //   const mockResponse = {
    //       name: 'Chess',
    //       decription: 'Best chess courses'
    //   };

    //   mockBackend.connections.subscribe((connection) => {
    //     connection.mockRespond(new Response(new ResponseOptions({
    //       body: JSON.stringify(mockResponse)
    //     })));
    //   });

    //   service.getTopics().subscribe((topicData) => {
    //     expect(topicData.length).toBe(1);
    //     expect(topicData.name).toEqual('Chess');
    //     expect(topicData.description).toEqual('Best chess courses');
    //   });
    // }));
  // });
// });
