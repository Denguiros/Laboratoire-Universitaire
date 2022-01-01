import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    cin: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    prenom: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    dateInscription: new FormControl(""),
    grade: new FormControl(""),
    cv: new FormControl(""),
    photo: new FormControl(""),
    etablissement: new FormControl(""),
    diplome: new FormControl(""),
  });

  // @ts-ignore
  member= JSON.parse(localStorage.getItem('user'));

  constructor(private memberService: MemberService, private router: Router) {
  }

  ngOnInit(): void {
    this.memberService.getMemeberByEmail(this.member.email).then((member) => {
      $("#type").select2({
        theme: "classic",
        placeholder: "Select a type"
      });
      this.member = member;
      if(member.diplome != null)
      {
        this.member.type="Etudiant";
      }
      else {
        this.member.type="Enseignant";
      }
      this.form.patchValue(member);
    })
  }
  onFileSelect(event: any,type:string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // @ts-ignore
      this.form.get(type).setValue(file);
    }
  }
  onSubmit(): void {
    const memberToSave: Member = {
      ...this.form.value,
    } as Member;
    memberToSave.id = this.member.id;
    memberToSave.cv = "";
    memberToSave.photo = "";
    const formData = new FormData();
    formData.append("cv",this.form.value.cv);
    formData.append("photo",this.form.value.photo);
    formData.append("member",JSON.stringify(memberToSave));
    this.memberService.updateMemberWithFiles(formData,memberToSave.id,this.member.type).then(() => this.router.navigate(['/component/member-show/'+memberToSave.id]));
  }
}
