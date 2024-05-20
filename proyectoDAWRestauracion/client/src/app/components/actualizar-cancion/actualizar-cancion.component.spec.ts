import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCancionComponent } from './actualizar-cancion.component';

describe('ActualizarCancionComponent', () => {
  let component: ActualizarCancionComponent;
  let fixture: ComponentFixture<ActualizarCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarCancionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
