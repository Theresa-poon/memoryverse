import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VersePage } from './verse.page';

describe('VersePage', () => {
  let component: VersePage;
  let fixture: ComponentFixture<VersePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
