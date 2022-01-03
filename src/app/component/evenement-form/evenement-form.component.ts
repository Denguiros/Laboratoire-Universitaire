import { Component, OnInit } from '@angular/core';
import {EvenementService} from "../../../services/evenement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../../models/member.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Evenement} from "../../../models/evenement.model";


@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  submitted = false;
  form: any;
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
    }
  }
  onSubmit()
  {}
}
