import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlChucnangComponent } from './ql-chucnang.component';

describe('QlChucnangComponent', () => {
  let component: QlChucnangComponent;
  let fixture: ComponentFixture<QlChucnangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlChucnangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlChucnangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
