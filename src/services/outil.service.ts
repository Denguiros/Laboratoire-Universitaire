import {Outil} from './../models/outil.member';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Member} from "../models/member.model";


@Injectable({
  providedIn: 'root'
})
export class OutilService {
  public tab: Outil[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveOutil(formData: FormData): Promise<Outil> {
    return this.httpClient.post<Outil>('http://localhost:4200/api/OUTIL-SERVICE/outils', formData).toPromise();
  }

  updateOutil(id: string, formData: FormData): Promise<Outil> {
    return this.httpClient.put<Outil>('http://localhost:4200/api/OUTIL-SERVICE/outils/' + id, formData).toPromise();
  }

  getOutilById(id: string): Promise<Outil> {
    return this.httpClient
      .get<Outil>('http://localhost:4200/api/OUTIL-SERVICE/outils/' + id)
      .toPromise();
  }

  getAllOutils(): Promise<Outil[]> {

    return this.httpClient
      .get<Outil[]>('http://localhost:4200/api/OUTIL-SERVICE/outils')
      .toPromise();
  }

  deleteOutilById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:4200/api/OUTIL-SERVICE/Outils/' + id).toPromise();
  }

  affecterOutilAMembre(outilId: string, memberId: string): Promise<void> {
    return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/" + memberId + "/outil/" + outilId,
      null).toPromise();
  }

  desaffecterOutilDeMembre(idMember: string, idOutil: string) {
    return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/" + idMember + "/outil/" + idOutil + "/desaffecter",
      null).toPromise();
  }

  getMemberOfOutil(id: string): Promise<Member> {
    return this.httpClient.get<Member>("http://localhost:4200/api/MEMBRE-SERVICE/outil/" + id).toPromise();
  }

  getOutilFile(filePath: string) {
    const params = new HttpParams().set("path", filePath);
    return this.httpClient
      .get('http://localhost:4200/api/OUTIL-SERVICE/get-file',
        {
          params,
          responseType: 'blob'
        })
      .toPromise();
  }
}
