import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProlabComponent } from './prolab.component';

describe('ProlabComponent', () => {
  let component: ProlabComponent;
  let fixture: ComponentFixture<ProlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
