import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";
import {Select2OptionData} from "ng-select2";


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    cin: new FormControl("", [Validators.required,Validators.maxLength(8),Validators.minLength(8),Validators.pattern("^[0-9]*$")]),
    nom: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    prenom: new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z ]*$")]),
    email: new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    date: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    grade: new FormControl("", [Validators.required]),
    etablissement: new FormControl("", [Validators.required]),
    diplome: new FormControl("", [Validators.required]),
  });
  currentId: string = '';
  memberReceivedByService: any;
  fromType = "Add";

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    $("#type").select2({
      theme: "classic",
      placeholder: "Select a type"
    });
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemberById(this.currentId).then((member) => {

        if (member.id != null) {
          this.fromType = "Update";
          this.memberReceivedByService = member;
          this.form.patchValue(member);
          if (member.grade != null) {
            $("#type").val("Enseignant");
          } else {
            $("#type").val("Etudiant");
          }
          $("#type").trigger("change");
        } else {
          this.router.navigate(["/component/members"])
        }
      });
    }
  }

  onSubmit(): void {
    const memberToSave: Member = {
      ...this.memberReceivedByService,
      ...this.form.value,
    };
    memberToSave.type = $('#type').select2('data')[0].id;
    if (memberToSave.type === "Etudiant") {
      memberToSave.dateInscription = new Date().toISOString().slice(0, 10);
    }
    console.log(memberToSave);
    if (memberToSave.id != null) {
      this.memberService.updateMember(memberToSave).then(() => this.router.navigate(['/component/members']));
    } else {
      this.memberService
        .saveMember(memberToSave)
        .then(() => this.router.navigate(['/component/members']));
    }
  }

  get m(){
    return this.form.controls;
  }
}

