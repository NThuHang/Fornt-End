import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlGiangvienComponent } from './ql-giangvien.component';

describe('QlGiangvienComponent', () => {
  let component: QlGiangvienComponent;
  let fixture: ComponentFixture<QlGiangvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlGiangvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlGiangvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
