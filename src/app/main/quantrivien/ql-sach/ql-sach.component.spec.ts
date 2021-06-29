import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlSachComponent } from './ql-sach.component';

describe('QlSachComponent', () => {
  let component: QlSachComponent;
  let fixture: ComponentFixture<QlSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlSachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
