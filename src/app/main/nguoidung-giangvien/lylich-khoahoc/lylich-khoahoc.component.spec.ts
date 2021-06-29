import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LylichKhoahocComponent } from './lylich-khoahoc.component';

describe('LylichKhoahocComponent', () => {
  let component: LylichKhoahocComponent;
  let fixture: ComponentFixture<LylichKhoahocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LylichKhoahocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LylichKhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
