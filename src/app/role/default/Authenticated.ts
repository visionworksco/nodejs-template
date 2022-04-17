import { ApiRole } from '../ApiRole';

export const Authenticated: ApiRole = {
  product: {
    findAll: true,
    findById: true,
    save: false,
    updateById: true,
    replaceById: false,
    deleteById: false,
  },
};
