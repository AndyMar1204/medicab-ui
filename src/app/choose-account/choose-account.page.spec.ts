import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseAccountPage } from './choose-account.page';

describe('ChooseAccountPage', () => {
  let component: ChooseAccountPage;
  let fixture: ComponentFixture<ChooseAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
