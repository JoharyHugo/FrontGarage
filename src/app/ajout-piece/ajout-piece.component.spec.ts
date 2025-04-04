import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPieceComponent } from './ajout-piece.component';

describe('AjoutPieceComponent', () => {
  let component: AjoutPieceComponent;
  let fixture: ComponentFixture<AjoutPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutPieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
