import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
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
  submitted = false;
  currentId: string = '';
  fromType = "Add";
  member = {} as Member;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  form: FormGroup = this.fb.group({
    cin: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
    nom: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    prenom: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
    email: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    date: ["", [Validators.required]],
    type: [""],
    admin: [""],
  });

  ngOnInit(): void {
    $("#type").select2({
      theme: "classic",
    });
    const etudiant = {
      id: 'Etudiant',
      text: 'Etudiant'
    };
    const enseignant = {
      id: 'Enseignant',
      text: 'Enseignant'
    };
    const etudiantOption = new Option(etudiant.text, etudiant.id, false, false);
    const enseignantOption = new Option(enseignant.text, enseignant.id, false, false);
    const self = this;
    $('#type').append(etudiantOption).trigger('change');
    $('#type').append(enseignantOption).trigger('change');

    // tslint:disable-next-line:only-arrow-functions
    $('#type').on("select2:select", function(e) {
      const data = $('#type').select2('data')[0].id;
      if (data === 'Enseignant') {
        self.form.addControl('grade', new FormControl('', Validators.required));
        self.form.addControl('etablissement', new FormControl('', Validators.required));
        self.form.removeControl('dateInscription');
        self.form.removeControl('diplome');
      }
      if (data === 'Etudiant') {
        self.form.addControl('dateInscription', new FormControl('', Validators.required));
        self.form.addControl('diplome', new FormControl('', Validators.required));
        self.form.removeControl('grade');
        self.form.removeControl('etablissement');
      }
    });


    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemberById(this.currentId).then((member) => {

        if (member.id != null) {
          this.fromType = "Update";
          this.member = member;

          if (member.type !== 'etd') {
            $("#type").val("Enseignant");
            self.form.addControl('grade', new FormControl('', Validators.required));
            self.form.addControl('etablissement', new FormControl('', Validators.required));
          } else {
            $("#type").val("Etudiant");
            self.form.addControl('dateInscription', new FormControl('', Validators.required));
            self.form.addControl('diplome', new FormControl('', Validators.required));
          }
          $("#type").trigger("change");
          this.form.patchValue(member);
        } else {
          this.router.navigate(["/component/members"])
        }
      });

    }
    else
    {
      self.form.addControl('dateInscription', new FormControl('', Validators.required));
      self.form.addControl('diplome', new FormControl('', Validators.required));
    }

  }

  onSubmit(): void {

    this.submitted = true;
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a member!');
    } else {
      const memberToSave: Member = {
        ...this.member,
        ...this.form.value,
      };
      memberToSave.type = $('#type').select2('data')[0].id;
      memberToSave.cv = "";
      memberToSave.photo = "";
      const formData = new FormData();
      formData.append("cv", memberToSave.cv);
      formData.append("photo", memberToSave.photo);
      formData.append("member", JSON.stringify(memberToSave));

      if (memberToSave.id != null) {
        this.memberService.updateMemberType(memberToSave.type, memberToSave.id).then(() => {
          this.memberService.updateMemberWithFiles(formData, memberToSave.id, memberToSave.type).then(() => this.router.navigate(['/component/members']));
        });
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

