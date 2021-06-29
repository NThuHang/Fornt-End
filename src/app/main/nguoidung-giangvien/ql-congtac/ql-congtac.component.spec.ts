import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlCongtacComponent } from './ql-congtac.component';

describe('QlCongtacComponent', () => {
  let component: QlCongtacComponent;
  let fixture: ComponentFixture<QlCongtacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlCongtacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlCongtacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
