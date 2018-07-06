import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarhorasComponent } from './listarhoras.component';

describe('ListarhorasComponent', () => {
  let component: ListarhorasComponent;
  let fixture: ComponentFixture<ListarhorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarhorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarhorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
