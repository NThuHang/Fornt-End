import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlHoinghiComponent } from './ql-hoinghi.component';

describe('QlHoinghiComponent', () => {
  let component: QlHoinghiComponent;
  let fixture: ComponentFixture<QlHoinghiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlHoinghiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlHoinghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
