import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationShowComponent } from './publication-show.component';

describe('PublicationShowComponent', () => {
  let component: PublicationShowComponent;
  let fixture: ComponentFixture<PublicationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
