import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  submitted = false;
  form = this.formBuilder.group({
    signature: ['', Validators.required]
  });
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Comic Sans MS',
    defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.htmlContent);
  }

  onChange(event:any) {
    console.log('changed');
  }

  onBlur(event:any) {
    console.log('blur ' + event);
  }
  onSubmit(): void {
    this.submitted = true;
    if(!this.form.valid) {
      alert('Please fill all the required fields to create a publication!') ;
    } else {
      console.log('succeed');

    }
  }

  get m(){
    return this.form.controls;
  }
}
