import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  // model?

  topics: any = [];

  // provider Http, hacemos llamadas
  constructor(private http: HttpClient) {
    // function to bring topics, getTopics
    this.getTopics();
    // Cómo manejar los Observers, "off", para usarlo solo una vez
   }

  getTopics() {
    this.topics = topicsData;
  }
}
