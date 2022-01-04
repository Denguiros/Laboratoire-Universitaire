import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { MembersComponent } from './members/members.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {DataTablesModule} from "angular-datatables";
import { MemberFormComponent } from './member-form/member-form.component';
import { EvenementsComponent } from './evenements/evenements.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import { PublicationsComponent } from './publications/publications.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { OutilsComponent } from './outils/outils.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { ProfileComponent } from './profile/profile.component';
import { MemberShowComponent } from './member-show/member-show.component';
import { EvenementShowComponent } from './evenement-show/evenement-show.component';
import { OutilsShowComponent } from './outils-show/outils-show.component';
import { EncadrementFormComponent } from './encadrement-form/encadrement-form.component';
import {SafePipe} from "../safe.pipe";



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
]);
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule,
    DataTablesModule,
    AngularEditorModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    SweetAlert2Module.forRoot(),
  ],
  declarations: [
    SafePipe,
    MembersComponent,
    MemberFormComponent,
    EvenementsComponent,
    PublicationsComponent,
    PublicationFormComponent,
    EvenementFormComponent,
    OutilsComponent,
    OutilFormComponent,
    ProfileComponent,
    MemberShowComponent,
    EvenementShowComponent,
    OutilsShowComponent,
    EncadrementFormComponent
  ],

})
export class ComponentsModule { }
