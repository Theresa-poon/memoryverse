import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersemarathonPage } from './versemarathon.page';

describe('VersemarathonPage', () => {
  let component: VersemarathonPage;
  let fixture: ComponentFixture<VersemarathonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersemarathonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersemarathonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
