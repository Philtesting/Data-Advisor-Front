import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForfaitMobileComponent } from './forfait-mobile.component';

describe('ForfaitMobileComponent', () => {
  let component: ForfaitMobileComponent;
  let fixture: ComponentFixture<ForfaitMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForfaitMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForfaitMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
