import { Outil } from './../../../models/outil.member';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-outils-show',
  templateUrl: './outils-show.component.html',
  styleUrls: ['./outils-show.component.scss']
})
export class OutilsShowComponent implements OnInit {
  outil = {} as Outil;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  outilSource()
  {
    return this.sanitizer.bypassSecurityTrustUrl(this.outil.source);
  }

}
