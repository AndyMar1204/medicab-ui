import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HopitalPage } from './hopital.page';

describe('HopitalPage', () => {
  let component: HopitalPage;
  let fixture: ComponentFixture<HopitalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HopitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
