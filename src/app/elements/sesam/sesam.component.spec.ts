import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesamComponent } from './sesam.component';

describe('SesamComponent', () => {
  let component: SesamComponent;
  let fixture: ComponentFixture<SesamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
