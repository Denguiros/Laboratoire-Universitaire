import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Member} from "../models/member.model";
import {Evenement} from '../models/evenement.model'
@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  public tab: Member[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveMember(member: Member, type: string): Promise<Evenement> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (type.valueOf() === "Enseignant") {
      return this.httpClient.post<Evenement>('http://localhost:9000/EVENEMENT-SERVICE/membres/enseignant', member,httpOptions).toPromise();
    }
      return this.httpClient.post<Evenement>('http://localhost:9000/EVENEMENT-SERVICE/membres/etudiant', member,httpOptions).toPromise();

  }

  getEvenementById(id: string): Promise<Evenement> {
    return this.httpClient
      .get<Evenement>('http://localhost:9000/EVENEMENT-SERVICE/membre/' + id)
      .toPromise();
  }

  deleteEvenementById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('LinkToRestAPI').toPromise();
    this.tab = this.tab.filter((evenement) => evenement.id !== id);
    return new Promise((resolve) => resolve());
  }

  getAllEvenements(): Promise<Evenement[]> {

    return this.httpClient
      .get<Evenement[]>('http://localhost:9000/EVENEMENT-SERVICE/membres')
      .toPromise();
  }
}
