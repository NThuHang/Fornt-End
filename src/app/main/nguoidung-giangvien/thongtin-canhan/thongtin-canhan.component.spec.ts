import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinCanhanComponent } from './thongtin-canhan.component';

describe('ThongtinCanhanComponent', () => {
  let component: ThongtinCanhanComponent;
  let fixture: ComponentFixture<ThongtinCanhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongtinCanhanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinCanhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
