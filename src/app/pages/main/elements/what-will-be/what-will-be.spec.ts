import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWillBe } from './what-will-be';

describe('WhatWillBe', () => {
  let component: WhatWillBe;
  let fixture: ComponentFixture<WhatWillBe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatWillBe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatWillBe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
