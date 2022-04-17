import { ApiRole } from '../ApiRole';

export const Authenticated: ApiRole = {
  product: {
    findAll: true,
    findById: true,
    save: true,
    updateById: false,
    replaceById: false,
    deleteById: false,
  },
};
