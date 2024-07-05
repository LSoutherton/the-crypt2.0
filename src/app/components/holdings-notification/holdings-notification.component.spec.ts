import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingsNotificationComponent } from './holdings-notification.component';

describe('HoldingsNotificationComponent', () => {
  let component: HoldingsNotificationComponent;
  let fixture: ComponentFixture<HoldingsNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldingsNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldingsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
