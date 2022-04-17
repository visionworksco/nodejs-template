import { ApiRole } from '../ApiRole';
import { Authenticated } from '../default/Authenticated';

export const Admin: ApiRole = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    updateById: true,
    replaceById: true,
    deleteById: true,
  },
};
