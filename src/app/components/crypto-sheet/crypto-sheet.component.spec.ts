import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoSheetComponent } from './crypto-sheet.component';

describe('CryptoSheetComponent', () => {
  let component: CryptoSheetComponent;
  let fixture: ComponentFixture<CryptoSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
