import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuChildAPage } from './menu-child-a.page';

describe('MenuChildAPage', () => {
  let component: MenuChildAPage;
  let fixture: ComponentFixture<MenuChildAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuChildAPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuChildAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
