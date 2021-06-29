import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuongdanSinhvienNckhComponent } from './huongdan-sinhvien-nckh.component';

describe('HuongdanSinhvienNckhComponent', () => {
  let component: HuongdanSinhvienNckhComponent;
  let fixture: ComponentFixture<HuongdanSinhvienNckhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuongdanSinhvienNckhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HuongdanSinhvienNckhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
