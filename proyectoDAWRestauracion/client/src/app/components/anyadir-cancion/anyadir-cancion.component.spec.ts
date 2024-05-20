import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirCancionComponent } from './anyadir-cancion.component';

describe('AnyadirCancionComponent', () => {
  let component: AnyadirCancionComponent;
  let fixture: ComponentFixture<AnyadirCancionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyadirCancionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnyadirCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
