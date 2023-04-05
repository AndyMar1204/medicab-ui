import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HospitalsPage } from './hospitals.page';

describe('HospitalsPage', () => {
  let component: HospitalsPage;
  let fixture: ComponentFixture<HospitalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HospitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
