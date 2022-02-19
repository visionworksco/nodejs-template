import { SwaggerConstants } from '../SwaggerConstants';
import { SwaggerCrudApiDocs } from '../SwaggerCrudApiDocs';

const apiDocs = new SwaggerCrudApiDocs(
  '/accountChartWidgets',
  [SwaggerConstants.Tag.ACCOUNT_CHART_WIDGET],
  'account chart widget',
  null,
  '#/components/schemas/AccountChartWidget',
  '#/components/schemas/AccountChartWidgetPayload',
  ['save', 'deleteById'],
);

export const AccountCharWidgets = {
  paths: {
    ...apiDocs.getPaths().paths,
  },
};
