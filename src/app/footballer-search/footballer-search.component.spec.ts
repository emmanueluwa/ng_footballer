import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballerSearchComponent } from './footballer-search.component';

describe('FootballerSearchComponent', () => {
  let component: FootballerSearchComponent;
  let fixture: ComponentFixture<FootballerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
