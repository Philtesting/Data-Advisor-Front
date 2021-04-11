import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInternetComponent } from './box-internet.component';

describe('BoxInternetComponent', () => {
  let component: BoxInternetComponent;
  let fixture: ComponentFixture<BoxInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxInternetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
