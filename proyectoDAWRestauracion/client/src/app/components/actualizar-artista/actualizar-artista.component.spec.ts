import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarArtistaComponent } from './actualizar-artista.component';

describe('ActualizarArtistaComponent', () => {
  let component: ActualizarArtistaComponent;
  let fixture: ComponentFixture<ActualizarArtistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarArtistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
