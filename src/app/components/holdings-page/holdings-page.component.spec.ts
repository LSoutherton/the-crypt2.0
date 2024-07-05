import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingsPageComponent } from './holdings-page.component';

describe('HoldingsPageComponent', () => {
  let component: HoldingsPageComponent;
  let fixture: ComponentFixture<HoldingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoldingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
