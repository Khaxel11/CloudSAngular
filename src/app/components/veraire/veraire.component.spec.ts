import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeraireComponent } from './veraire.component';

describe('VeraireComponent', () => {
  let component: VeraireComponent;
  let fixture: ComponentFixture<VeraireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeraireComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
