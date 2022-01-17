
import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import {Member} from "../../../../models/member.model";
import {MemberService} from "../../../../services/member.service";
import {OutilService} from "../../../../services/outil.service";
import {EvenementService} from "../../../../services/evenement.service";
import {PublicationService} from "../../../../services/publication.service";
import { AnyComponent } from 'preact';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html'
})
export class FeedsComponent implements OnInit {
  members: Member[] = [];
  NumberOfMembers = 0;
  NumberOfEvents = 0;
  NumberOfPublications = 0;
  NumberOfTools = 0;
  doughnutChartLabels: Label[] = [ 'PUB', 'TOOLS','EVENTS'];
  tab : any = [];
  doughnutChartData: MultiDataSet = [
    this.tab
  ];
  public doughnutChartColors: any[] = [{
    backgroundColor: [      'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(75, 192, 192)',]
   }];


  doughnutChartType: ChartType = 'doughnut';

  constructor(private memberService: MemberService,
              private evenementSerice: EvenementService,
              private outilService: OutilService, private publicationService: PublicationService) {

  }


  ngOnInit(): void {
    this.getNumberOfMembers()
  }

  async getNumberOfMembers() {
    await this.evenementSerice.getAllEvemenements().then((event) => {
      this.NumberOfEvents = event.length
      this.tab[0]=this.NumberOfEvents.toString();
    })
    await this.outilService.getAllOutils().then((outil) => {
      this.NumberOfTools = outil.length
      this.tab[1]=this.NumberOfTools.toString();
    });
    await this.publicationService.getAllPublications().then((pub) => {
      this.NumberOfPublications = pub.length
      this.tab[2]=this.NumberOfPublications.toString();
    });

  }
}
