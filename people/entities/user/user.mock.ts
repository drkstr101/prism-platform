import { User } from "./user.js";

export const userMock = {
  larry: User.from({
    username: 'larry',
    displayName: 'Larry Smith',
    email: 'larry@gmail.com',
    id: 'hash-1',
  }),
  rose: User.from({
    username: 'rose',
    displayName: 'Rodney Rose',
    email: 'rose@gmail.com',
    id: 'hash-2',
  })
};
