import { SentenceCorrectorPipe } from './sentence-corrector.pipe';

describe('SentenceCorrectorPipe', () => {
  it('create an instance', () => {
    const pipe = new SentenceCorrectorPipe();
    expect(pipe).toBeTruthy();
  });
});
