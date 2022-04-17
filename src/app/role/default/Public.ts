import { ApiRole } from '../ApiRole';

export const Public: ApiRole = {
  product: {
    findAll: false,
    findById: false,
    save: false,
    updateById: true,
    replaceById: false,
    deleteById: false,
  },
};
