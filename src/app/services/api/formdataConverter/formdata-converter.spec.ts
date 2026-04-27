import { TestBed } from '@angular/core/testing';

import { FormdataConverter } from './formdata-converter';

describe('FormdataConverter', () => {
  let service: FormdataConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormdataConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
