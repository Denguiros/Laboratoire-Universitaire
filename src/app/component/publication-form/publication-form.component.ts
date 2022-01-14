import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Publication} from "../../../models/publication.model";
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../../models/member.model";
import {PublicationService} from "../../../services/publication.service";

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  // @ts-ignore
  loggedInUser = JSON.parse(localStorage.getItem("user"));
  submitted = false;
  currentId: string = '';
  fromType = "Add";
  publication = {} as Publication;
  collaborateurs = [] as Member[];

  constructor(
    private publicationService: PublicationService,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  form: FormGroup = this.fb.group({
    type: ["", [Validators.required]],
    titre: ["", [Validators.required]],
    date: ["", [Validators.required]],
    description: ["", [Validators.required]],
    photo: ["", [Validators.required]],
    sourcepdf: ["", [Validators.required]],
    collaborateurs: [""],
  });

  ngOnInit(): void {
    $("#collaborateurs").select2({
      multiple: true,
      placeholder: "Collaborateurs ?"
    });

    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getCollaborateursPublication(this.currentId).then((members) => {
        console.log(members)
        this.collaborateurs = members;
      });
    }
    this.memberService.getAllMembers().then((members) => {
      members.forEach(member => {
        const opt = {
          id: member.id,
          text: member.nom + " " + member.prenom
        }
        var selected = false;
        if (this.collaborateurs.filter((mem) => member.id === mem.id).length > 0) {
          selected = true;
        }
        const formOption = new Option(opt.text, opt.id, false, selected);
        $('#collaborateurs').append(formOption).trigger('change');
      })
    })
    if (this.currentId) {
      this.form.removeControl('sourcepdf');
      this.form.removeControl('photo');
      this.form.addControl('photo', new FormControl(''));
      this.form.addControl('sourcepdf', new FormControl(''));
      this.publicationService.getPublicationById(this.currentId).then((publication) => {
        if (publication.id != null) {
          this.fromType = "Update";
          this.publication = publication;
          this.form.patchValue(this.publication);
        }
      }).catch((error) => {
        this.router.navigate(["/component/publications"]);
      });

    }
  }

  onFileSelect(event: any, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // @ts-ignore
      this.form.get(type).setValue(file);
    }
  }

  onSubmit() {
    this.submitted = true;
    const collabOptions = $('#collaborateurs').select2('data');
    const collaborateursAAffecter: string[] = [];
    collabOptions.forEach((coll) => {
      collaborateursAAffecter.push(coll.id)
    });
    console.log(collaborateursAAffecter)
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a publication!');
    } else {
      const publicationToSave: Publication = {
        ...this.publication,
        ...this.form.value,
      };
      publicationToSave.sourcePDF = "";
      publicationToSave.photo = "";

      const formData = new FormData();
      formData.append("pdf", this.form.value.sourcepdf);
      formData.append("photo", this.form.value.photo);
      formData.append("publication", JSON.stringify(publicationToSave));
      if (publicationToSave.id != null) {
        this.publicationService.desaffecterPublicationMembres(publicationToSave.id).then(()=>{
          collaborateursAAffecter.forEach(coll => {
            this.publicationService.affecterPublicationAMembre(publicationToSave.id, coll);
          })
        })

        this.publicationService.updatePublication(formData, publicationToSave.id).then(
          () => this.router.navigate(['/component/publications']));
      } else {
        this.publicationService
          .savePublication(formData)
          .then((pub) => {
            collaborateursAAffecter.forEach(coll => {
              this.publicationService.affecterPublicationAMembre(pub.id, coll);
            })
            this.publicationService.affecterPublicationAMembre(pub.id, this.loggedInUser.id)
              .then(() => this.router.navigate(['/component/publications'])
              )
          });
      }

    }
  }

  get formControls() {
    return this.form.controls;
  }

}
