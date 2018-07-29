import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics = [];

  // provider Http, hacemos llamadas
  constructor(private http: HttpClient) {}

  getTopics(): Observable<any> {
    // Cómo manejar los Observers, "of", para usarlo solo una vez

    // Construimos el elemento para emitir cosas
    // Q admite modificaciones...
    const obs = new BehaviorSubject<any>(this.topics);
    if (!this.topics.length) {
      // get siempre devuelve un Observer
      this.http.get('http://localhost:8089/topics')
        .subscribe(
          (topicsData: any) => {
            this.topics = topicsData;
            obs.next(this.topics);
          }
        );
    } else {
      return new Observable((observ) => observ.next(this.topics));
    }

    // Se transforma en Observable para emitirlo y q el componente lo maneje con el subscribe
    return obs.asObservable();

    // return this.http.get('http://localhost:8089/topics')
    //   .pipe(
    //     // Map para tratar los datos que llegan, aunque esto no hace demasiado
    //     map((n: Response) => {
    //       this.topics.push(n);
    //       return n;
    //     })
    //   );
  }
}
