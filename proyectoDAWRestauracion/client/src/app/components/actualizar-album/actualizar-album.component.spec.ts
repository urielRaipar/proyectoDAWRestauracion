import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAlbumComponent } from './actualizar-album.component';

describe('ActualizarAlbumComponent', () => {
  let component: ActualizarAlbumComponent;
  let fixture: ComponentFixture<ActualizarAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
