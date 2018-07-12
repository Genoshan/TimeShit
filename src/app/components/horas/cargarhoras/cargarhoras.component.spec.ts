import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarhorasComponent } from './cargarhoras.component';

describe('CargarhorasComponent', () => {
  let component: CargarhorasComponent;
  let fixture: ComponentFixture<CargarhorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarhorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarhorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
