import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseErrorComponent } from './purchase-error.component';

describe('PurchaseErrorComponent', () => {
  let component: PurchaseErrorComponent;
  let fixture: ComponentFixture<PurchaseErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
