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
  }

  getTopics() {
    // Cómo manejar los Observers, "of", para usarlo solo una vez
    // get siempre devuelve un Observer
    return this.http.get('http://localhost:8089/topics');
  }
}
