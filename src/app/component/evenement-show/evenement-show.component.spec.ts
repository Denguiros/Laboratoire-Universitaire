import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementShowComponent } from './evenement-show.component';

describe('EvenementShowComponent', () => {
  let component: EvenementShowComponent;
  let fixture: ComponentFixture<EvenementShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
