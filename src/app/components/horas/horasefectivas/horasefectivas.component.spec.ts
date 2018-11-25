import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasefectivasComponent } from './horasefectivas.component';

describe('HorasefectivasComponent', () => {
  let component: HorasefectivasComponent;
  let fixture: ComponentFixture<HorasefectivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasefectivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasefectivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
