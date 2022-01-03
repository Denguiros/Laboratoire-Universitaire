import { Outil } from './../../../models/outil.member';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

var outilJSON = {
  "id": "123",
  "date" : new Date(),
  "source" : "https://github.com/mrdoob/three.js/",
}

@Component({
  selector: 'app-outils-show',
  templateUrl: './outils-show.component.html',
  styleUrls: ['./outils-show.component.scss']
})
export class OutilsShowComponent implements OnInit {
  outil : Outil = outilJSON;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }
  outilSource()
  {
    return this.sanitizer.bypassSecurityTrustUrl(this.outil.source);
  }

}
