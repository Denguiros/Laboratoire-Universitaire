import { Evenement } from './../../../models/evenement.model';
import { Component, OnInit } from '@angular/core';

var evenementJSON = {
  "id": "123",
  "titre": "Bot Bot",
  "date" : new Date(),
  "lieu" : "Houmt Souk",
}

@Component({
  selector: 'app-evenement-show',
  templateUrl: './evenement-show.component.html',
  styleUrls: ['./evenement-show.component.scss']
})
export class EvenementShowComponent implements OnInit {

  evenement : Evenement = evenementJSON;

  constructor() { }

  ngOnInit(): void {
  }

}
