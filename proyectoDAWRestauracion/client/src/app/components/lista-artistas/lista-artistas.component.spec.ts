import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtistasComponent } from './lista-artistas.component';

describe('ListaArtistasComponent', () => {
  let component: ListaArtistasComponent;
  let fixture: ComponentFixture<ListaArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
