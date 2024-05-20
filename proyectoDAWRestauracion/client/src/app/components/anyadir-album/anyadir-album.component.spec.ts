import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirAlbumComponent } from './anyadir-album.component';

describe('AnyadirAlbumComponent', () => {
  let component: AnyadirAlbumComponent;
  let fixture: ComponentFixture<AnyadirAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnyadirAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnyadirAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
