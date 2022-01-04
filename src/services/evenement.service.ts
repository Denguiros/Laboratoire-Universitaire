import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Evenement} from '../models/evenement.model'
import {Outil} from "../models/outil.member";
@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  public tab: Evenement[] = [];
  constructor(private httpClient: HttpClient) {
  }

  saveEvemenement(evenement: Evenement): Promise<Evenement> {
    return this.httpClient.post<Evenement>('http://localhost:4200/api/EVENEMENT-SERVICE/evenement/add', evenement).toPromise();
  }

  updateEvemenement(evenement: Evenement): Promise<Evenement> {
    return this.httpClient.put<Evenement>('http://localhost:4200/api/EVENEMENT-SERVICE/evenement/'+evenement.id, evenement).toPromise();
  }

  getEvemenementById(id: string): Promise<Evenement> {
    return this.httpClient
      .get<Evenement>('http://localhost:4200/api/EVENEMENT-SERVICE/evenement/' + id)
      .toPromise();
  }
  getAllEvemenements(): Promise<Evenement[]> {

    return this.httpClient
      .get<Evenement[]>('http://localhost:4200/api/EVENEMENT-SERVICE/evenements')
      .toPromise();
  }

  deleteEvenementById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('LinkToRestAPI').toPromise();
    this.tab = this.tab.filter((evenement) => evenement.id !== id);
    return new Promise((resolve) => resolve());
  }
  affecterEvenementAMembre(evenementId:string,memberId:string):Promise<void>
  {
    return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/" + memberId + "/evenement/" + evenementId,
      null).toPromise();
  }

  desaffecterEvenementDeMembre(evenementId:string,memberId:string):Promise<void>{
    return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/" + memberId + "/evenement/" + evenementId+"/desaffecter",
      null).toPromise();
  }
}
