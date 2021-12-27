import { Routes } from '@angular/router';
import {MembersComponent} from "./members/members.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {EvenementsComponent} from "./evenements/evenements.component";
import {PublicationFormComponent} from "./publication-form/publication-form.component";
import {PublicationsComponent} from "./publications/publications.component";
import {EvenementFormComponent} from "./evenement-form/evenement-form.component";
import { ProfileComponent } from './profile/profile.component';
import { MemberShowComponent } from './member-show/member-show.component';
import {OutilsComponent} from "./outils/outils.component";


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [

      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'member-form',
        component: MemberFormComponent
      },
      {
        path: 'member-form/:id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: 'evenements',
        component: EvenementsComponent
      },
      {
        path: 'outils',
        component: OutilsComponent
      },
      {
        path: 'evenement-form',
        component: EvenementFormComponent
      },
      {
        path: 'publication-form',
        component: PublicationFormComponent
      }
      ,
      {
        path: 'publications',
        component: PublicationsComponent
      },
	    {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'member-show/:id',
        component: MemberShowComponent
      },
		]
	}
];
