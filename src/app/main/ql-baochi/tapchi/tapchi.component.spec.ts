import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapchiComponent } from './tapchi.component';

describe('TapchiComponent', () => {
  let component: TapchiComponent;
  let fixture: ComponentFixture<TapchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TapchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
