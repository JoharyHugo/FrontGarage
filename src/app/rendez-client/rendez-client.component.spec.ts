import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezClientComponent } from './rendez-client.component';

describe('RendezClientComponent', () => {
  let component: RendezClientComponent;
  let fixture: ComponentFixture<RendezClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
