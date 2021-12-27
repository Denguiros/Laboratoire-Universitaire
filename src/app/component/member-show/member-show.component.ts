import { Member } from './../../../models/member.model';
import { Component, OnInit } from '@angular/core';

var memberJSON = {
  "id": "12",
  "cin": "652365",
  "nom": "Ben Yaala",
  "prenom": "Soufiane",
  "type": "TEACHER",
  "cv": "string",
  "email":"string@gmailcom",
  "date":"2020-10",
  "dateInscription": "2020-10",
  "diplome": "PhD",
  "encadreur":"string",
  "grade": "PhD",
  "etablissement": "ENIS"
};

@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.scss']
})
export class MemberShowComponent implements OnInit {
  Member: Member = memberJSON;

  constructor() {
    console.log(this.Member);
  }

  ngOnInit(): void {
  }


}
