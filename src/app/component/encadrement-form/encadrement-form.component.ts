import {Component, OnDestroy, OnInit} from '@angular/core';
import {Member} from "../../../models/member.model";
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-encadrement-form',
  templateUrl: './encadrement-form.component.html',
  styleUrls: ['./encadrement-form.component.scss']
})
export class EncadrementFormComponent implements OnDestroy, OnInit {
  submitted = false;
  currentId: string = '';
  fromType = "Add";
  etudiantsNonEncadrees = {} as Member[];
  etudiantsDeEnseignant = {} as Member[];
  etudiants = [] as Member[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getEtudiantsNonEncadres().then(members=>{
        this.etudiantsNonEncadrees = members;
        this.etudiants = this.etudiants.concat(this.etudiantsNonEncadrees);
        this.etudiantsNonEncadrees.forEach(member=>{
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
        });
      });
      this.memberService.getEtudiantsDeEnseignant(this.currentId).then((members) => {
        this.etudiantsDeEnseignant = members;
        this.etudiants = this.etudiants.concat(this.etudiantsDeEnseignant);
        this.dtTrigger.next();
        this.etudiantsDeEnseignant.forEach((member) => {
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
        })
      });


    } else {
      this.router.navigate(["/component/members"])
    }

  }
  onDesaffecte(id: string) {
    this.memberService.desaffecterEtudiant(id).then(()=>{
      this.etudiantsNonEncadrees = this.etudiantsNonEncadrees.concat(this.etudiantsDeEnseignant.filter(member=>member.id===id));
      this.etudiantsDeEnseignant = this.etudiantsDeEnseignant.filter(member => member.id !== id);
    });
  }
  onAffecter(id:string)
  {
    this.memberService.affecterEtudiant(id,this.currentId).then(()=>{
      this.etudiantsDeEnseignant = this.etudiantsDeEnseignant.concat(this.etudiantsNonEncadrees.filter(member=>member.id===id));
      this.etudiantsNonEncadrees = this.etudiantsNonEncadrees.filter(member => member.id !== id);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  onSubmit(): void {

    }
}
