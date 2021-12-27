import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../../services/member.service";
import {Member} from "../../../models/member.model";
import {Subject} from "rxjs";
import {SwalComponent} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html'
})
export class MembersComponent implements OnDestroy, OnInit {
  members: Member[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getAllMemebers().then((members) => {
      this.members = members;
      this.dtTrigger.next();
    });
  }
  onRemove(id: string) {
    this.memberService.deleteMemberById(id).then(() => {
      this.memberService.getAllMemebers().then((members) => {
        this.members = members;
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  constructor(
    private memberService: MemberService
  ) {}
}
