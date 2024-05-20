import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetalleComponent } from './album-detalle.component';

describe('AlbumDetalleComponent', () => {
  let component: AlbumDetalleComponent;
  let fixture: ComponentFixture<AlbumDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlbumDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
