import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaisachComponent } from './loai-sach.component';

describe('LoaisachComponent', () => {
  let component: LoaisachComponent;
  let fixture: ComponentFixture<LoaisachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaisachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaisachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
