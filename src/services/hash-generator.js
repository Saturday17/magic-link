import { MD5 } from 'object-hash';

export const getHashCode = (user) => MD5(user);
