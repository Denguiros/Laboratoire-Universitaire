import { Outil } from './../../../models/outil.member';
import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
