import { ApiRole } from '../ApiRole';
import { Authenticated } from '../default/Authenticated';

export const Author: ApiRole = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    updateById: true,
    replaceById: true,
  },
};
