import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVerifiedComponent } from './payment-verified.component';

describe('PaymentVerifiedComponent', () => {
  let component: PaymentVerifiedComponent;
  let fixture: ComponentFixture<PaymentVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
