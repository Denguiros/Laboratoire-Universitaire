import {Component, OnInit} from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Evenement} from "../../../models/evenement.model";
import {Outil} from "../../../models/outil.member";
import {Member} from "../../../models/member.model";
import {MemberService} from "../../../services/member.service";


@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({
    titre: new FormControl("", [Validators.required]),
    lieu: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
  });
  currentId: string = '';
  formType = "Add";
  EvenementReceivedByService: any;
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;

  constructor(private evenementService: EvenementService, private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  get m() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.evenementService.getEvemenementById(this.currentId).then((evenement) => {
        if (evenement.id != null) {
          this.EvenementReceivedByService = evenement;
          this.form.patchValue(evenement);
          this.formType = "Update";
        } else {
          this.router.navigate(["/component/evenements"])
        }
      });

    } else {

    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a outil!');
    } else {
      const EvenementToSave: Evenement = {
        ...this.EvenementReceivedByService,
        ...this.form.value,
      };
      if (EvenementToSave.id != null) {
        this.evenementService.updateEvemenement(EvenementToSave).then((evenement) =>
          this.evenementService.affecterEvenementAMembre(evenement.id, this.loggedInUser.id)
            .then(() => this.router.navigate(['/component/evenement-show/'+evenement.id])));
      }
      this.evenementService
        .saveEvemenement(EvenementToSave)
        .then((evenement) =>
          this.evenementService.affecterEvenementAMembre(evenement.id, this.loggedInUser.id)
            .then(() => this.router.navigate(['/component/evenements'])));
    }
  }
}
