import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirArtistaComponent } from './anyadir-artista.component';

describe('AnyadirArtistaComponent', () => {
  let component: AnyadirArtistaComponent;
  let fixture: ComponentFixture<AnyadirArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyadirArtistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnyadirArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
