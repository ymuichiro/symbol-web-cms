import { atom } from 'recoil';

export const roll = atom<'public' | 'authenticated'>({
  default: 'public',
  key: 'roll',
});
