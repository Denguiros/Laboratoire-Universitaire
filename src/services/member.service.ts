import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Member} from "../models/member.model";

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public tab: Member[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveMember(member: Member): Promise<Member> {
    if (member.type.valueOf() === "Enseignant") {
      return this.httpClient.post<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant', member).toPromise();
    }
    return this.httpClient.post<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant', member).toPromise();

  }

  updateMemberWithFiles(formData: FormData, id: string, type: string): Promise<Member> {
    const httpOptions = {
      reportProgress: true
    }
    if (type.valueOf() === "Enseignant") {
      return this.httpClient.put<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant/' + id,
        formData, httpOptions).toPromise();
    }
    return this.httpClient.put<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant/' + id,
      formData, httpOptions).toPromise();
  }

  getMemberById(id: string): Promise<Member> {
    return this.httpClient
      .get<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membre/' + id)
      .toPromise();
  }

  deleteMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:4200/api/MEMBRE-SERVICE/membres/' + id).toPromise();
  }

  getAllMembers(): Promise<Member[]> {

    return this.httpClient
      .get<Member[]>('http://localhost:4200/api/MEMBRE-SERVICE/membres')
      .toPromise();
  }

  getMemberByEmail(email: string) {
    const params = new HttpParams().set("email", email);
    return this.httpClient
      .get<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membre/search/email', {
        params
      })
      .toPromise();
  }

  getUserFile(filePath: string) {
    const params = new HttpParams().set("path", filePath);
    return this.httpClient
      .get('http://localhost:4200/api/MEMBRE-SERVICE/get-file', {
        params,
        responseType: 'blob'
      })
      .toPromise();
  }

  updateMemberType(type: string, id: string) {
    if (type === "Etudiant") {
      type = "etd";
    } else {
      type = "ens";
    }
    return this.httpClient
      .put<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/' + id + '/type?type='+type,{})
      .toPromise();
  }
}
