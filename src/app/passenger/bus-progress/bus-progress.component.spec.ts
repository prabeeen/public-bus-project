import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusProgressComponent } from './bus-progress.component';

describe('BusProgressComponent', () => {
  let component: BusProgressComponent;
  let fixture: ComponentFixture<BusProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
