import { CoinNamePipe } from './coin-name.pipe';

describe('CoinNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CoinNamePipe();
    expect(pipe).toBeTruthy();
  });
});
