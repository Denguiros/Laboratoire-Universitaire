import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Publication} from "../models/publication.model";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient: HttpClient) {
  }
  savePublication(formData: FormData): Promise<Publication>
  {
    const httpOptions = {
      reportProgress: true
    }
    return this.httpClient.post<Publication>("http://localhost:4200/api/PUBLICATION-SERVICE/nouvellePublication"
      ,formData, httpOptions).toPromise();
  }
  getPublicationById(id:string):Promise<Publication>
  {
    return this.httpClient.get<Publication>("http://localhost:4200/api/PUBLICATION-SERVICE/publication/"+id).toPromise();
  }
  getAllPublications():Promise<Publication[]>
  {
    return this.httpClient.get<Publication[]>("http://localhost:4200/api/PUBLICATION-SERVICE/publications").toPromise();
  }
  updatePublication(formData: FormData,id:string): Promise<Publication>
  {
    const httpOptions = {
      reportProgress: true
    }
    return this.httpClient.put<Publication>("http://localhost:4200/api/PUBLICATION-SERVICE/editPublication/"+id
      ,formData, httpOptions).toPromise();
  }
  deletePublication(id:string):Promise<void>
  {
    return this.httpClient.delete<void>("http://localhost:4200/api/PUBLICATION-SERVICE/deletePublication/"+id).toPromise();
  }
  affecterPublicationAMembre(publicationId:string,memberId:string):Promise<void>
  {
    return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/" + memberId + "/publication/" + publicationId,
      null).toPromise();
  }

  getPublicationFile(path: string) {
    const params = new HttpParams().set("path", path);
    return this.httpClient
      .get('http://localhost:4200/api/PUBLICATION-SERVICE/get-file', {
        params,
        responseType: 'blob'
      })
      .toPromise();
  }

  desaffecterPublicationMembres(publicationId:string) {
    {
      return this.httpClient.post<void>("http://localhost:4200/api/MEMBRE-SERVICE/membre/publication/" + publicationId+"/desaffecter",
        null).toPromise();
    }
  }
}
