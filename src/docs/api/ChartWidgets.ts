import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/chartWidgets',
  [SwaggerConstants.Tag.CHART_WIDGET],
  'chart widget',
  'chart widgets',
  '#/components/schemas/ChartWidget',
  '#/components/schemas/ChartWidgetPayload',
  ['*'],
);

export const ChartWidgets = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
