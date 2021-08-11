import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPictureHeadingComponent } from './full-picture-heading.component';

describe('FullPictureHeadingComponent', () => {
  let component: FullPictureHeadingComponent;
  let fixture: ComponentFixture<FullPictureHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPictureHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullPictureHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
