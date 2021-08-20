import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviveComponent } from './revive.component';

describe('ReviveComponent', () => {
  let component: ReviveComponent;
  let fixture: ComponentFixture<ReviveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
