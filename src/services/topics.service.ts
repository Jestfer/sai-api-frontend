import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics = [];
  private obs = new BehaviorSubject<any>(this.topics);

  // provider Http, hacemos llamadas
  constructor(private http: HttpClient) {}

  getTopics(): Observable<any> {
    // Cómo manejar los Observers, "of", para usarlo solo una vez

    // Construimos el elemento para emitir cosas
    // Q admite modificaciones... para topics
    if (!this.topics.length) {
      // get siempre devuelve un Observer
      this.http.get('http://localhost:8089/topics')
        .subscribe(
          (topicsData: any) => {
            this.topics = topicsData;
            // emite (el next es el emisor) un evento de que se ha modificado topics, y lo mandamos
            this.obs.next(this.topics);
          }
        );
    } else {
      // Decirle al componente q como hay topics, mandamos el siguiente y que reaccione

      // PROGRAMACIÓN BASADA EN ESTADOS
      // Los servicios son los que se encargan del movimiento y transformación de datos
      // Los componentes reaccionan para pintar

      // Si metemos un nuevo observable aquí, el servicio no tiene el control sobre
      // el observado... hay que intentar trabajar solo con un observable
      return new Observable((observ) => observ.next(this.topics));
    }

    // Se transforma en Observable para emitirlo y q el componente lo maneje con el subscribe
    return this.obs.asObservable();
  }
}
