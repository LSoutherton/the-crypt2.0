import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPopUpComponent } from './buy-pop-up.component';

describe('BuyPopUpComponent', () => {
  let component: BuyPopUpComponent;
  let fixture: ComponentFixture<BuyPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
