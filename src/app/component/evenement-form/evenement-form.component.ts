import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Evenement} from "../../../models/evenement.model";
import {Outil} from "../../../models/outil.member";


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
  EvenementReceivedByService: any;

  constructor(private evenementService: EvenementService,private router: Router,
              private activatedRoute: ActivatedRoute)
  {

  }

  get m(){
    return this.form.controls;
  }

  ngOnInit(): void {
    $("#type").select2({
      theme:"classic",
    });
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
    } else {
      this.evenementService.getEvemenementById(this.currentId).then((evenement) => {

        if (evenement.id != null) {
          this.EvenementReceivedByService = evenement;
          this.form.patchValue(evenement);
        } else {
          this.router.navigate(["/component/evenements"])
        }
      });
    }
  }
  onSubmit()
  {
   this.submitted=true;
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a outil!');
    } else {
      const EvenementToSave: Evenement = {
        ...this.EvenementReceivedByService,
        ...this.form.value,
      };
      EvenementToSave.date = new Date();
      if (EvenementToSave.id != null) {
        this.evenementService.updateEvemenement(EvenementToSave).then(() => this.router.navigate(['/component/evenementToSaves']));
      }
      this.evenementService
        .saveEvemenement(EvenementToSave)
        .then(() => this.router.navigate(['/component/evenements']));
    }
  }
}
