import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics = [];
  private obs = new BehaviorSubject<any>(this.topics);

  constructor(private http: HttpClient) {}

  getTopics(): BehaviorSubject<any> {
    if (!this.topics.length) {
      this.http.get('http://localhost:8089/topics')
        .subscribe(
          (topicsData: any) => {
            this.topics = topicsData;
            this.obs.next(this.topics);
          }
        );
    }

    return this.obs;
  }
}
