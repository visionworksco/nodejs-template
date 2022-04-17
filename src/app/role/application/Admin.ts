import { ApiRole } from '../ApiRole';
import { Authenticated } from '../default/Authenticated';

export const Admin: ApiRole = {
  ...Authenticated,
  product: {
    ...Authenticated.product,
    save: true,
    updateById: true,
    replaceById: true,
    deleteById: true,
  },
};
