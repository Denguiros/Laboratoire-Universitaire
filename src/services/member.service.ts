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
  updateMember(member: Member): Promise<Member> {
    if (member.type.valueOf() === "Enseignant") {
      return this.httpClient.put<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/enseignant/'+member.id, member).toPromise();
    }
    return this.httpClient.put<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membres/etudiant/'+member.id, member).toPromise();

  }

  getMemeberById(id: string): Promise<Member> {
    return this.httpClient
      .get<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membre/' + id)
      .toPromise();
  }

  deleteMemberById(id: string): Promise<void> {
     return this.httpClient.delete<void>('http://localhost:4200/api/MEMBRE-SERVICE/membres/' + id).toPromise();
  }

  getAllMemebers(): Promise<Member[]> {

    return this.httpClient
      .get<Member[]>('http://localhost:4200/api/MEMBRE-SERVICE/membres')
      .toPromise();
  }

  getMemeberByEmail(email: string) {
    const params = new HttpParams().set("email",email);
    return this.httpClient
      .get<Member>('http://localhost:4200/api/MEMBRE-SERVICE/membre/search/email',{
        params
      })
      .toPromise();
  }
}
