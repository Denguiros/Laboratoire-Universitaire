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
    codeSource: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    nom: new FormControl("", [Validators.required]),
    open: new FormControl(""),
  });
  currentId: string = '';
  outilReceivedByService: any;
  fromType = "Add";
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;

  // tslint:disable-next-line:variable-name
  constructor(
    private outilService: OutilService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
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
      outilToSave.codeSource = "";
      const formData = new FormData();
      formData.append("outil", JSON.stringify(outilToSave));
      formData.append("codeSource", this.form.value.codeSource);
      if (outilToSave.id != null) {
        this.outilService.updateOutil(outilToSave.id, formData).then(() => this.router.navigate(['/component/outils']));
      } else {
        this.outilService
          .saveOutil(formData)
          .then((outil) => {
            console.log(outil)
            this.outilService.affecterOutilAMembre(outil.id, this.loggedInUser.id).then(() => {
              this.router.navigate(['/component/outils'])
            })
          });
      }
    }

  }


  get m() {
    return this.form.controls;
  }

  onFileSelect(event: any, type: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // @ts-ignore
      this.form.get(type).setValue(file);
    }
  }
}
