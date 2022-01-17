import { CardData } from './../top-cards/top-cards.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Member} from "../../../../models/member.model";
import {MemberService} from "../../../../services/member.service";
import {OutilService} from "../../../../services/outil.service";
import {EvenementService} from "../../../../services/evenement.service";
import {PublicationService} from "../../../../services/publication.service";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions
} from 'ng-apexcharts';

export type salesChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: any;
  theme: ApexTheme;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  colors: string[];
  markers: any;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html'
})
export class SalesRatioComponent implements OnInit {
  members: Member[] = [];
  NumberOfMembers = 0;
  NumberOfEvents = 0;
  NumberOfPublications = 0;
  NumberOfTools = 0;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['MBER', 'PUB', 'TOOLS','EVENTS'];
  barChartType: ChartType = 'bar';
  barChartLegend = false;
  barChartPlugins = [];
  tab : any = [];
  barChartData: ChartDataSets[] = [
    { data: this.tab,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
    ],
    borderWidth: 1}
  ];

  constructor(private memberService: MemberService,
              private evenementSerice: EvenementService,
              private outilService: OutilService, private publicationService: PublicationService) {

  }


  ngOnInit(): void {
    this.getNumberOfMembers()
  }

  async getNumberOfMembers() {
    await this.memberService.getAllMembers().then((members) => {
      this.members = members;
      this.NumberOfMembers = members.length
      this.tab[0]=this.NumberOfMembers.toString();
    });
    await this.evenementSerice.getAllEvemenements().then((event) => {
      this.NumberOfEvents = event.length
      this.tab[1]=this.NumberOfEvents.toString();
    })
    await this.outilService.getAllOutils().then((outil) => {
      this.NumberOfTools = outil.length
      this.tab[2]=this.NumberOfTools.toString();
    });
    await this.publicationService.getAllPublications().then((pub) => {
      this.NumberOfPublications = pub.length
      this.tab[3]=this.NumberOfPublications.toString();
    });

  }


}
