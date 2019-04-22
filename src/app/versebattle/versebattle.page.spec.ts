import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersebattlePage } from './versebattle.page';

describe('VersebattlePage', () => {
  let component: VersebattlePage;
  let fixture: ComponentFixture<VersebattlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersebattlePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersebattlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
