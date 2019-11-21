import {LocalDateTimePipe} from './local-date-time.pipe';

describe('LocalDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new LocalDateTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('number should transform to local date time format', () => {
    const pipe = new LocalDateTimePipe();
    const expected = new Date(0).toLocaleString();
    expect(pipe.transform(0)).toContain(expected);
  });

});
