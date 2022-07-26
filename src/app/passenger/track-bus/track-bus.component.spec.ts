import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBusComponent } from './track-bus.component';

describe('TrackBusComponent', () => {
  let component: TrackBusComponent;
  let fixture: ComponentFixture<TrackBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
