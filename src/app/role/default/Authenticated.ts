import { ApiRole } from '../ApiRole';

export const Authenticated: ApiRole = {
  product: {
    findAll: true,
    findById: false,
    save: false,
    updateById: true,
    replaceById: false,
    deleteById: false,
  },
};
