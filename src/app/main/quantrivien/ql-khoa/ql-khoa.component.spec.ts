import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlKhoaComponent } from './ql-khoa.component';

describe('QlKhoaComponent', () => {
  let component: QlKhoaComponent;
  let fixture: ComponentFixture<QlKhoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlKhoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlKhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
