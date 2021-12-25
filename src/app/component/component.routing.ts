import { MemberEditComponent } from './member-edit/member-edit.component';

import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import {MembersComponent} from "./members/members.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {EvenementsComponent} from "./evenements/evenements.component";
import {PublicationFormComponent} from "./publication-form/publication-form.component";
import {PublicationsComponent} from "./publications/publications.component";
import {EvenementFormComponent} from "./evenement-form/evenement-form.component";
import { ProfileComponent } from './profile/profile.component';
import { MemberShowComponent } from './member-show/member-show.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'member-form',
        component: MemberFormComponent
      },
      {
        path: 'evenements',
        component: EvenementsComponent
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
        path: 'member-show',
        component: MemberShowComponent
      },
      {
        path: 'member-edit',
        component: MemberEditComponent
      },
		]
	}
];
