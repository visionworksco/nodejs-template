import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/products',
  [SwaggerConstants.Tag.PRODUCTS],
  'product',
  'products',
  '#/components/schemas/Product',
  '#/components/schemas/ProductPayload',
  ['*'],
);

export const Products = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
