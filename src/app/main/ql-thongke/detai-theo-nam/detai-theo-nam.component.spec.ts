import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaiTheoNamComponent } from './detai-theo-nam.component';

describe('DetaiTheoNamComponent', () => {
  let component: DetaiTheoNamComponent;
  let fixture: ComponentFixture<DetaiTheoNamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaiTheoNamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaiTheoNamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
