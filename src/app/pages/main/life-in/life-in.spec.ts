import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeIn } from './life-in';

describe('LifeIn', () => {
  let component: LifeIn;
  let fixture: ComponentFixture<LifeIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
