import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaiKhoahocComponent } from './detai-khoahoc.component';

describe('DetaiKhoahocComponent', () => {
  let component: DetaiKhoahocComponent;
  let fixture: ComponentFixture<DetaiKhoahocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaiKhoahocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaiKhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
