import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";
import {Select2OptionData} from "ng-select2";

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
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  form: any;
  currentId: string = '';
  memberReceivedByService: any;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      $("#type").select2({
        theme:"classic",
        placeholder: "Select a type"
      });
      this.currentId = this.activatedRoute.snapshot.params.id;
      if (this.currentId) {
        this.memberService.getMemeberById(this.currentId).then((member) => {
          this.memberReceivedByService = member;
          console.log('Found member');
          console.log(member);
          this.initForm(member);
        });
      } else {
        this.initForm(null);
      }
    }

    onSubmit(): void {
      const memberToSave: Member = {
        ...this.memberReceivedByService,
        ...this.form.value,
      };
      memberToSave.type = $('#type').select2('data')[0].id;
      console.log(memberToSave);
      this.memberService
        .saveMember(memberToSave,memberToSave.type)
        .then(() => this.router.navigate(['./members']));
    }

    initForm(member: Member | null): void {
      this.form = new FormGroup({
        cin: new FormControl(member?.cin, [Validators.required]),
        nom: new FormControl(member?.nom, [Validators.required]),
        prenom: new FormControl(member?.prenom, [Validators.required]),
        email: new FormControl(member?.email, [Validators.required]),
        dateNaissance: new FormControl(member?.date, [Validators.required]),
        type: new FormControl(member?.type, [Validators.required]),
        grade: new FormControl(member?.grade, [Validators.required]),
        etablissement: new FormControl(member?.etablissement, [Validators.required]),
        diplome: new FormControl(member?.diplome, [Validators.required]),
      });
    }

}
