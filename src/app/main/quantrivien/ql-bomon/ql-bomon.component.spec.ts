import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlBomonComponent } from './ql-bomon.component';

describe('QlBomonComponent', () => {
  let component: QlBomonComponent;
  let fixture: ComponentFixture<QlBomonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlBomonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlBomonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
