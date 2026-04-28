import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adaptation } from './adaptation';

describe('Adaptation', () => {
  let component: Adaptation;
  let fixture: ComponentFixture<Adaptation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adaptation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adaptation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
