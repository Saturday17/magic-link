import { env } from './env';
import { login } from './e2e-functions';

describe('login', () => {
  it('should signup correctly with correct username and password', () => {
    login(env.username, env.password);
  });

  it('should throw error if username is invalid', () => {
    login(env.fakeusername, env.password, { valid: false });
  });

  it('should throw error if password is invalid', () => {
    login(env.username, env.fakepassword, { valid: false });
  });
});
