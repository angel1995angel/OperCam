import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorproductivoComponent } from './sectorproductivo.component';

describe('SectorproductivoComponent', () => {
  let component: SectorproductivoComponent;
  let fixture: ComponentFixture<SectorproductivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorproductivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorproductivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
