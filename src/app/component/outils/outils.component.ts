import { Outil } from './../../../models/outil.member';
import { OutilService } from './../../../services/outil.service';
import { Subject } from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../../../models/member.model";
import {MemberService} from "../../../services/member.service";

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsComponent implements OnInit ,OnDestroy{
  // @ts-ignore
  loggedInUser = localStorage.getItem("user") !== '' ? JSON.parse(localStorage.getItem('user')) : null;
  outils: Outils[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loggedInUserIsAdmin : boolean = false;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllOutils();
    if(this.loggedInUser != null)
    {
      if (this.loggedInUser.admin)
      {
        this.loggedInUserIsAdmin = true;
      }
    }
  }

  getAllOutils() {
    this.outilService.getAllOutils().then((outils) => {

      outils.forEach((out)=>{
        this.outilService.getMemberOfOutil(out.id).then((member)=>{
          const outilArrayElement = {
            outil: out,
            membre: member
          } as Outils;
          if (member.photo !== '') {
            this.memberService.getUserFile(member.photo).then((photo) => {
              const reader = new FileReader();
              reader.readAsDataURL(photo);
              // @ts-ignore
              reader.onloadend = () => {
                // @ts-ignore
                document.querySelector('#image' + member.id).src = reader.result;
              }
            });
          }
          this.outilService.getOutilFile(out.codeSource).then((codeSource) => {
            const file = new Blob([codeSource]);
            // @ts-ignore
            document.querySelector('#source' + out.id).href = URL.createObjectURL(file);
            // @ts-ignore
            document.querySelector('#source' + out.id).download = out.nom+'.rar';
          })
          this.outils.push(outilArrayElement);
          this.dtTrigger.next();
        });
      });

    });
  }
  onRemove(idMember: string,idOutil:string) {
    this.outilService.deleteOutilById(idOutil).then(() => {
      this.outilService.desaffecterOutilDeMembre(idMember,idOutil).then(()=>{
        this.outils = this.outils.filter((outil)=>outil.outil.id !==idOutil);
      })
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  constructor(
    private outilService: OutilService,
    private memberService:MemberService
  ) {}

}
export interface Outils{
  outil:Outil;
  membre:Member
}
