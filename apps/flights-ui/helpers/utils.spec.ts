import { formatDate } from './utils';

describe('utility', () => {
  it('When formatting the date should return just the time formatted 13:20', () => {
    const now = new Date();
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      13,
      20,
      22
    );
    expect(formatDate(date)).toEqual('13:20');
  });

  it('When passing a null date and empty string should return', () => {
    expect(formatDate(null)).toEqual('');
  });
});
