import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  constructor(
    private publicationService: PublicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  form: FormGroup = this.fb.group({
    type: ["", [Validators.required]],
    titre: ["", [Validators.required]],
    date: ["", [Validators.required]],
    sourcePdf: ["", [Validators.required]],
  });

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.publicationService.getPublicationById(this.currentId).then((publication) => {

        if (publication.id != null) {
          this.fromType = "Update";
          this.publication = publication;
          this.form.patchValue(this.publication);
        }
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
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a publication!');
    } else {
      const publiationToSave: Publication = {
        ...this.publication,
        ...this.form.value,
      };
      publiationToSave.sourcepdf = "";
      const formData = new FormData();
      formData.append("pdf", this.form.value.sourcePdf);
      formData.append("publication", JSON.stringify(publiationToSave));
      console.log(this.form.value.sourcePdf);
      if (publiationToSave.id != null) {
        this.publicationService.updatePublication(formData, publiationToSave.id).then(
          () => this.router.navigate(['/component/publications']));
      } else {
        this.publicationService
          .savePublication(formData)
          .then(() => this.router.navigate(['/component/publications']));
      }
    }
  }

  get formControls() {
    return this.form.controls;
  }

}
