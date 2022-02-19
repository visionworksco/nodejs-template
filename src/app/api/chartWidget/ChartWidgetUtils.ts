import { ChartWidget } from './ChartWidget';

const isOwner = (chartWidget: ChartWidget, userEmail: string | undefined): boolean => {
  return !!chartWidget.createdBy && !!userEmail && chartWidget.createdBy === userEmail;
};

export const ChartWidgetUtils = {
  isOwner,
};
