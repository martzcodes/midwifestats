import { MidwifeModule } from './midwife.module';

describe('MidwifeModule', () => {
  let midwifeModule: MidwifeModule;

  beforeEach(() => {
    midwifeModule = new MidwifeModule();
  });

  it('should create an instance', () => {
    expect(midwifeModule).toBeTruthy();
  });
});
