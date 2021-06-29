import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlTaikhoanComponent } from './ql-taikhoan.component';

describe('QlTaikhoanComponent', () => {
  let component: QlTaikhoanComponent;
  let fixture: ComponentFixture<QlTaikhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlTaikhoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlTaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
