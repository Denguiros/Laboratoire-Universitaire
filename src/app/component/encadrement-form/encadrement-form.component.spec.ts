import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrementFormComponent } from './encadrement-form.component';

describe('EncadrementFormComponent', () => {
  let component: EncadrementFormComponent;
  let fixture: ComponentFixture<EncadrementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncadrementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncadrementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
