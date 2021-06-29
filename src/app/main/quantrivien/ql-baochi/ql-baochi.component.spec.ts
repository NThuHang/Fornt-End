import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlBaochiComponent } from './ql-baochi.component';

describe('QlBaochiComponent', () => {
  let component: QlBaochiComponent;
  let fixture: ComponentFixture<QlBaochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlBaochiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlBaochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
