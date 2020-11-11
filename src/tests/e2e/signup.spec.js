import { env } from './env';
import { signup } from './e2e-functions';

describe('signup', () => {
  it('should signup with correct username and password', () => {
    signup(env.username, env.password, env.password);
  });

  it('should show error if fake password', () => {
    signup(env.username, env.password, env.fakepassword, { valid: false });
  });
});
