import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlDetaiComponent } from './ql-detai.component';

describe('QlDetaiComponent', () => {
  let component: QlDetaiComponent;
  let fixture: ComponentFixture<QlDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlDetaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
