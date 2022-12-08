import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMesasComponent } from './reporte-mesas.component';

describe('ReporteMesasComponent', () => {
  let component: ReporteMesasComponent;
  let fixture: ComponentFixture<ReporteMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
