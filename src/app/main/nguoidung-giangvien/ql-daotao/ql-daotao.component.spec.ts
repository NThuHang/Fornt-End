import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDaotaoComponent } from './ql-daotao.component';

describe('QlDaotaoComponent', () => {
  let component: QlDaotaoComponent;
  let fixture: ComponentFixture<QlDaotaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlDaotaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlDaotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
