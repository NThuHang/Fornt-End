import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlQuyenComponent } from './ql-quyen.component';

describe('QlQuyenComponent', () => {
  let component: QlQuyenComponent;
  let fixture: ComponentFixture<QlQuyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlQuyenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlQuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
