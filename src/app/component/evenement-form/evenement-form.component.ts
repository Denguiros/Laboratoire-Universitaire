import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Evenement} from "../../../models/evenement.model";

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  form: any;
  currentId: string = '';
  EvenementReceivedByService: any;

  constructor(private evenementService: EvenementService,private router: Router,
              private activatedRoute: ActivatedRoute)
  {}


  ngOnInit(): void {
    $("#type").select2({
      theme:"classic",
      placeholder: "Select a type"
    });
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.evenementService.getEvenementById(this.currentId).then((evenement) => {
        this.EvenementReceivedByService = evenement;
        console.log('Found evenement');
        console.log(evenement);
        this.initForm(evenement);
      });
    } else {
      this.initForm(null);
    }
  }

  onSubmit(): void {
    /*const memberToSave: Member = {
      ...this.EvenementReceivedByService,
      ...this.form.value,
    };
    memberToSave.type = $('#type').select2('data')[0].id;
    console.log(memberToSave);
    this.Even
      .saveMember(memberToSave,memberToSave.type)
      .then(() => this.router.navigate(['./members']));*/
  }

  initForm(evenement: Evenement | null): void {
    this.form = new FormGroup({
      titre: new FormControl(evenement?.titre, [Validators.required]),
      date: new FormControl(evenement?.date, [Validators.required]),
      lieu: new FormControl(evenement?.lieu, [Validators.required]),

    });
  }
}
