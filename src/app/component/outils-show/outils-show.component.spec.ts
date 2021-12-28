import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsShowComponent } from './outils-show.component';

describe('OutilsShowComponent', () => {
  let component: OutilsShowComponent;
  let fixture: ComponentFixture<OutilsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutilsShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutilsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
