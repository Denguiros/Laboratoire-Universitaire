import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {
  htmlContent = '';
  constructor() { }

  ngOnInit(): void {
  }

}
