import {Member} from './../../../models/member.model';
import {Component, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-member-show',
  templateUrl: './member-show.component.html',
  styleUrls: ['./member-show.component.scss']
})
export class MemberShowComponent implements OnInit {
  member: any;

  constructor(private memberService: MemberService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  currentId = '';

  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    if (this.currentId) {
      this.memberService.getMemeberById(this.currentId).then((member) => {
        if(member.id != null)
        {
          this.member = member;
          this.member.type = member.grade != null ? "Enseignant" : "Etudiant";
        }
        else {
          this.router.navigate(["/component/members"]);
        }
        }
      )
      ;
    }
  }
}

