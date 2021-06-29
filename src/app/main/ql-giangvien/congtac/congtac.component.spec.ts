import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtacComponent } from './congtac.component';

describe('CongtacComponent', () => {
  let component: CongtacComponent;
  let fixture: ComponentFixture<CongtacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongtacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
