import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComandasComponent } from './detalle-comandas.component';

describe('DetalleComandasComponent', () => {
  let component: DetalleComandasComponent;
  let fixture: ComponentFixture<DetalleComandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleComandasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
