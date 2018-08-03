import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConnectionBackend, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TopicsService } from './topics.service';

describe('TopicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TopicsService, HttpClient, HttpHandler,
        { provide: ConnectionBackend, useClass: MockBackend }
       ]
    });
  });

  describe('#getTopics()', () => {
    it('should be created', inject([TopicsService], (service: TopicsService) => {
      expect(service).toBeTruthy();
    }));

    it('should return a BehaviourSubject<any<Topic>>',
      inject([TopicsService, ConnectionBackend], (service: TopicsService, mockBackend) => {

      const mockResponse = {
          name: 'Chess',
          decription: 'Best chess courses'
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getTopics().subscribe((topicData) => {
        expect(topicData.length).toBe(1);
        expect(topicData.name).toEqual('Chess');
        expect(topicData.description).toEqual('Best chess courses');
      });
    }));
  });
});
