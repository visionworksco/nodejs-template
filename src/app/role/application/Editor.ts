import { ApiRole } from '../ApiRole';
import { Authenticated } from '../default/Authenticated';

export const Editor: ApiRole = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    save: true,
  },
};
