import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwanaPage } from './awana.page';

describe('AwanaPage', () => {
  let component: AwanaPage;
  let fixture: ComponentFixture<AwanaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwanaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
