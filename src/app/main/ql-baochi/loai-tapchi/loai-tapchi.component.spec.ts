import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiTapchiComponent } from './loai-tapchi.component';

describe('LoaiTapchiComponent', () => {
  let component: LoaiTapchiComponent;
  let fixture: ComponentFixture<LoaiTapchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiTapchiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiTapchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
