import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseselfPage } from './verseself.page';

describe('VerseselfPage', () => {
  let component: VerseselfPage;
  let fixture: ComponentFixture<VerseselfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseselfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseselfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
