import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaochiComponent } from './baochi.component';

describe('BaochiComponent', () => {
  let component: BaochiComponent;
  let fixture: ComponentFixture<BaochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaochiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
