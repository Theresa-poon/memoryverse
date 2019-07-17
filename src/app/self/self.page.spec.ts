import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfPage } from './self.page';

describe('SelfPage', () => {
  let component: SelfPage;
  let fixture: ComponentFixture<SelfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
