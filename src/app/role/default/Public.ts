import { ApiRole } from '../ApiRole';

export const Public: ApiRole = {
  product: {
    findAll: true,
    findById: true,
    save: false,
    updateById: false,
    replaceById: false,
    deleteById: false,
  },
};
