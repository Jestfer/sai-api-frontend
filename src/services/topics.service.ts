import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  topics = [];
  // tipo de observable único, ... q ya tiene los datos de la llamada del If
  // Y este obs lo manejamos en los nuevos métodos del addTopic (con el refresh y demás)
  private obs = new BehaviorSubject<any>(this.topics);

  // provider Http, hacemos llamadas
  constructor(private http: HttpClient) {}

  // Emitimos el BehaviorSubject
  getTopics(): BehaviorSubject<any> {
    // Construimos el elemento para emitir cosas - Q admite modificaciones... para topics
    if (!this.topics.length) {
      // get siempre devuelve un Observer
      this.http.get('http://localhost:8089/topics')
        .subscribe( // Manejo interno del getTopics, q espera la llamada asíncrona del servicio
          // para obtener los topics del endpoint, es como un AJAX call
          (topicsData: any) => {
            this.topics = topicsData;
            // emite (el next es el emisor) un evento de que se ha modificado topics, y lo mandamos
            this.obs.next(this.topics);
          }
        );
    }
      // Decirle al componente q como hay topics, mandamos el siguiente y que reaccione

      // PROGRAMACIÓN BASADA EN ESTADOS
      // Los servicios son los que se encargan del movimiento y transformación de datos
      // Los componentes reaccionan para pintar

      // NEW: devolvemos un Behaviour Subject
      // Que es como el estado, que está por debajo del observable
      // Y todos se suscriben
    return this.obs;
    // EL COMPONENTE SE SUSCRIBE a "obs" hasta que tenga algo..., es decir, hasta que cambie...
    // Cuando cambie su estado, todos se repintan y sus valores cambian
  }
}
