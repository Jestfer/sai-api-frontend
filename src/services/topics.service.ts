import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private topics = []; // debe ser privado, que nadie sepa lo que hay dentro
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

    // Esto es lo primero q devuelve el test
    return this.obs;
  }

  // Refresh, los otros componentes escuchan el cambio y se actualizan
  refresh(): void {
    // El componente no se repinta al haber los mismos elementos,
    // es decir, no ve un cambio en el estado, el que añadimos nuevo
    // solo se va a ver con el Next (el emisor del cambio)
    this.topics = [];
    this.getTopics(); // eliminar esta línea y ver qué pasa si hay dudas
  }

  addTopic(topic: any): Observable<any> {
    // esto devuelve un 200, all ok
    return this.http.post<any>('http://localhost:8089/topics', topic);
  }
}
