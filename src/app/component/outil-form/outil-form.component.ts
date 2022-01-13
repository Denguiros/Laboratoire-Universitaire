import {Outil} from './../../../models/outil.member';
import {OutilService} from './../../../services/outil.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Route, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.scss']
})

export class OutilFormComponent implements OnInit {
  submitted = false;
  form: FormGroup = new FormGroup({
    source: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
  });
  currentId: string = '';
  outilReceivedByService: any;
  fromType = "Add";

  // tslint:disable-next-line:variable-name
  constructor(
              private outilService: OutilService,
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
      this.outilService.getOutilById(this.currentId).then((outil) => {

        if (outil.id != null) {
          this.fromType = "Update";
          this.outilReceivedByService = outil;
          this.form.patchValue(outil);
        } else {
          this.router.navigate(["/component/outils"])
        }
      });
    }
  }
  onSubmit(): void {
    this.submitted = true;
    if (!this.form.valid) {
      alert('Please fill all the required fields to create a outil!');
    } else {
      const outilToSave: Outil = {
        ...this.outilReceivedByService,
        ...this.form.value,
      };
      if (outilToSave.id != null) {
        this.outilService.updateOutil(outilToSave).then(() => this.router.navigate(['/component/outilToSaves']));
      }
      this.outilService
        .saveOutil(outilToSave)
        .then(() => this.router.navigate(['/component/outils']));
    }

  }


  get m() {
    return this.form.controls;
  }
}
