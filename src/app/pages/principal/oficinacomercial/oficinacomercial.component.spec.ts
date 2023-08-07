import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinacomercialComponent } from './oficinacomercial.component';

describe('OficinacomercialComponent', () => {
  let component: OficinacomercialComponent;
  let fixture: ComponentFixture<OficinacomercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OficinacomercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OficinacomercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
