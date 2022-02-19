import { AccountCharWidgets } from './AccountCharWidgets';
import { Accounts } from './Accounts';
import { AmpqEnobotCustomerStrategies } from './AmpqEnobotCustomerStrategies';
import { AmpqEnobotOrders } from './AmpqEnobotOrders';
import { AmpqEnobotStrategies } from './AmpqEnobotStrategies';
import { ChartWidgets } from './ChartWidgets';
import { CmdExchangeLogs } from './CmdExchangeLogs';
import { GapiSearch } from './GapiSearch';
import { GapiSearchMeta } from './GapiSearchMeta';
import { Heartbeats } from './Heartbeats';
import { Info } from './Info';
import { MuleEnobotCustomerStrategies } from './MuleEnobotCustomerStrategies';
import { MuleEnobotRequests } from './MuleEnobotRequests';
import { MuleEnobotStrategies } from './MuleEnobotStrategies';
import { MuleEpexAvg } from './MuleEpexAvg';
import { MuleEpexMeta } from './MuleEpexMeta';
import { MuleEpexObContracts } from './MuleEpexObContracts';
import { MuleEpexPublicTradeContracts } from './MuleEpexPublicTradeContracts';
import { Settings } from './Settings';
import { StatkraftEnobotRequests } from './StatkraftEnobotRequests';

export default {
  paths: {
    ...Accounts.paths,
    ...ChartWidgets.paths,
    ...AccountCharWidgets.paths,
    ...GapiSearchMeta.paths,
    ...GapiSearch.paths,
    ...AmpqEnobotOrders.paths,
    ...AmpqEnobotStrategies.paths,
    ...AmpqEnobotCustomerStrategies.paths,
    ...CmdExchangeLogs.paths,
    ...Info.paths,
    ...Settings.paths,
    ...StatkraftEnobotRequests.paths,
    ...MuleEnobotRequests.paths,
    ...MuleEnobotStrategies.paths,
    ...MuleEnobotCustomerStrategies.paths,
    ...MuleEpexMeta.paths,
    ...MuleEpexAvg.paths,
    ...MuleEpexObContracts.paths,
    ...MuleEpexPublicTradeContracts.paths,
    ...Heartbeats.paths,
  },
};
