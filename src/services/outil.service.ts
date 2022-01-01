import { Outil } from './../models/outil.member';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class OutilService {
  public tab: Outil[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveOutil(outil: Outil): Promise<Outil> {
      return this.httpClient.post<Outil>('http://localhost:4200/api/MEMBRE-SERVICE/outils/new', outil).toPromise();
  }

  updateOutil(outil: Outil): Promise<Outil> {
    return this.httpClient.put<Outil>('http://localhost:4200/api/MEMBRE-SERVICE/outils/'+outil.id, outil).toPromise();
  }

  getOutilById(id: string): Promise<Outil> {
    return this.httpClient
      .get<Outil>('http://localhost:9000/Outil-SERVICE/membre/' + id)
      .toPromise();
  }

  deleteOutilById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('LinkToRestAPI').toPromise();
    this.tab = this.tab.filter((outil) => outil.id !== id);
    return new Promise((resolve) => resolve());
  }

  getAllOutils(): Promise<Outil[]> {

    return this.httpClient
      .get<Outil[]>('http://localhost:9000/Outil-SERVICE/membres')
      .toPromise();
  }
}