import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseawanaPage } from './verseawana.page';

describe('VerseawanaPage', () => {
  let component: VerseawanaPage;
  let fixture: ComponentFixture<VerseawanaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseawanaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseawanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
