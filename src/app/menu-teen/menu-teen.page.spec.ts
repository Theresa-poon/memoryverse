import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTeenPage } from './menu-teen.page';

describe('MenuTeenPage', () => {
  let component: MenuTeenPage;
  let fixture: ComponentFixture<MenuTeenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTeenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTeenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
