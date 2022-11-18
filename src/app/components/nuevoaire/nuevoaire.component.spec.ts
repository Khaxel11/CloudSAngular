import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoaireComponent } from './nuevoaire.component';

describe('NuevoaireComponent', () => {
  let component: NuevoaireComponent;
  let fixture: ComponentFixture<NuevoaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoaireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
