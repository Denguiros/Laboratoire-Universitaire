import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
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
  // type Names
  Type: any = ['Enseignant', 'Etudiant']
  submitted = false;
  currentId: string = '';
  memberReceivedByService: any;
  fromType = "Add";

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder
  ) {
  }

  form: FormGroup = this.fb.group({
    cin: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
    nom: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    prenom: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    email: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    date: ["", [Validators.required]],
    type: ["", [Validators.required]],
    admin: ["", [Validators.required]],
  });

  ngOnInit(): void {
    this.form.get('type')?.valueChanges.subscribe(data => {
      if(data == 'Enseignant'){
        this.form.addControl('grade', new FormControl('', Validators.required));
        this.form.addControl('etablissement', new FormControl('', Validators.required));

        this.form.removeControl('dateInscription');
        this.form.removeControl('diplome');
      }
      if(data == 'Etudiant'){
        this.form.addControl('dateInscription', new FormControl('', Validators.required));
        this.form.addControl('diplome', new FormControl('', Validators.required));

        this.form.removeControl('grade');
        this.form.removeControl('etablissement');

      }
    })


    $("#type").select2({
      theme: "classic",
    });
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemberById(this.currentId).then((member) => {

        if (member.id != null) {
          this.fromType = "Update";
          this.memberReceivedByService = member;
          console.log(member);
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
   // Choose city using select dropdown
   changetype(e:any) {
    this.form.get('type')?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onSubmit(): void {

    this.submitted = true;
     if(!this.form.valid) {
      alert('Please fill all the required fields to create a member!') ;
     } else {
    const memberToSave: Member = {
      ...this.memberReceivedByService,
      ...this.form.value,
    };
    console.log(memberToSave);
    memberToSave.type = $('#type').select2('data')[0].id;
    if (memberToSave.type === "Etudiant") {
      memberToSave.dateInscription = new Date().toISOString().slice(0, 10);
    }
    memberToSave.cv = "";
    memberToSave.photo = "";
    const formData = new FormData();
    formData.append("cv", memberToSave.cv);
    formData.append("photo", memberToSave.photo);
    formData.append("member", JSON.stringify(memberToSave));

    if (memberToSave.id != null) {
      this.memberService.updateMemberWithFiles(formData, memberToSave.id, memberToSave.type).then(() => this.router.navigate(['/component/members']));
    } else {
      this.memberService
        .saveMember(memberToSave)
        .then(() => this.router.navigate(['/component/members']));
      console.log(this.form);

    }
  }

  }

  get formControls() {
    return this.form.controls;
  }

}

