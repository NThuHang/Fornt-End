import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoithaoKhoahocComponent } from './hoithao-khoahoc.component';

describe('HoithaoKhoahocComponent', () => {
  let component: HoithaoKhoahocComponent;
  let fixture: ComponentFixture<HoithaoKhoahocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoithaoKhoahocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoithaoKhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
