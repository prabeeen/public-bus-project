import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGPSComponent } from './send-gps.component';

describe('SendGPSComponent', () => {
  let component: SendGPSComponent;
  let fixture: ComponentFixture<SendGPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendGPSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
