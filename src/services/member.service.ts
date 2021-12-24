import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Member} from "../models/member.model";

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public tab: Member[] = [];

  constructor(private httpClient: HttpClient) {
  }

  saveMember(member: Member, type: string): Promise<Member> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    if (type.valueOf() === "Enseignant") {
      return this.httpClient.post<Member>('http://localhost:9000/MEMBRE-SERVICE/membres/enseignant', member,httpOptions).toPromise();
    }
      return this.httpClient.post<Member>('http://localhost:9000/MEMBRE-SERVICE/membres/etudiant', member,httpOptions).toPromise();

  }

  getMemeberById(id: string): Promise<Member> {
    return this.httpClient
      .get<Member>('http://localhost:9000/MEMBRE-SERVICE/membre/' + id)
      .toPromise();
  }

  deleteMemberById(id: string): Promise<void> {
    // return this.httpClient.delete<void>('LinkToRestAPI').toPromise();
    this.tab = this.tab.filter((member) => member.id !== id);
    return new Promise((resolve) => resolve());
  }

  getAllMemebers(): Promise<Member[]> {

    return this.httpClient
      .get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/membres')
      .toPromise();
  }
}
