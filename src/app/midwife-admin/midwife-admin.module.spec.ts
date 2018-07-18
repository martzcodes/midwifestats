import { MidwifeAdminModule } from './midwife-admin.module';

describe('MidwifeAdminModule', () => {
  let midwifeAdminModule: MidwifeAdminModule;

  beforeEach(() => {
    midwifeAdminModule = new MidwifeAdminModule();
  });

  it('should create an instance', () => {
    expect(midwifeAdminModule).toBeTruthy();
  });
});
