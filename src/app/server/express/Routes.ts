import {
  PsqlPool,
  RootRoute,
  Route,
  StaticFolderRegister,
  UndefinedRoute,
} from '@visionworksco/nodejs-middleware';
import { Application, Request, Response } from 'express';
import path from 'path';
import { AccountController } from '../../api/account/AccountController';
import { AccountRepository } from '../../api/account/AccountRepository';
import { AccountRoute } from '../../api/account/AccountRoute';
import { AccountService } from '../../api/account/AccountService';
import { AccountChartWidgetController } from '../../api/accountChartWidget/AccountChartWidgetController';
import { AccountChartWidgetRepository } from '../../api/accountChartWidget/AccountChartWidgetRepository';
import { AccountChartWidgetRoute } from '../../api/accountChartWidget/AccountChartWidgetRoute';
import { AccountChartWidgetService } from '../../api/accountChartWidget/AccountChartWidgetService';
import { AmpqEnobotCustomerStrategyController } from '../../api/ampq/ampqEnobotCustomerStrategy/AmpqEnobotCustomerStrategyController';
import { AmpqEnobotCustomerStrategyRepository } from '../../api/ampq/ampqEnobotCustomerStrategy/AmpqEnobotCustomerStrategyRepository';
import { AmpqEnobotCustomerStrategyRoute } from '../../api/ampq/ampqEnobotCustomerStrategy/AmpqEnobotCustomerStrategyRoute';
import { AmpqEnobotCustomerStrategyService } from '../../api/ampq/ampqEnobotCustomerStrategy/AmpqEnobotCustomerStrategyService';
import { AmpqEnobotOrderController } from '../../api/ampq/ampqEnobotOrder/AmpqEnobotOrderController';
import { AmpqEnobotOrderRepository } from '../../api/ampq/ampqEnobotOrder/AmpqEnobotOrderRepository';
import { AmpqEnobotOrderRoute } from '../../api/ampq/ampqEnobotOrder/AmpqEnobotOrderRoute';
import { AmpqEnobotOrderService } from '../../api/ampq/ampqEnobotOrder/AmpqEnobotOrderService';
import { AmpqEnobotStrategyController } from '../../api/ampq/ampqEnobotStrategy/AmpqEnobotStrategyController';
import { AmpqEnobotStrategyRepository } from '../../api/ampq/ampqEnobotStrategy/AmpqEnobotStrategyRepository';
import { AmpqEnobotStrategyRoute } from '../../api/ampq/ampqEnobotStrategy/AmpqEnobotStrategyRoute';
import { AmpqEnobotStrategyService } from '../../api/ampq/ampqEnobotStrategy/AmpqEnobotStrategyService';
import { ChartWidgetController } from '../../api/chartWidget/ChartWidgetController';
import { ChartWidgetRepository } from '../../api/chartWidget/ChartWidgetRepository';
import { ChartWidgetRoute } from '../../api/chartWidget/ChartWidgetRoute';
import { ChartWidgetService } from '../../api/chartWidget/ChartWidgetService';
import { CmdExchangeLogController } from '../../api/cmdExchangeLog/CmdExchangeLogController';
import { CmdExchangeLogRepository } from '../../api/cmdExchangeLog/CmdExchangeLogRepository';
import { CmdExchangeLogRoute } from '../../api/cmdExchangeLog/CmdExchangeLogRoute';
import { CmdExchangeLogService } from '../../api/cmdExchangeLog/CmdExchangeLogService';
import { GapiSearchController } from '../../api/gapi/data/GapiSearchController';
import { GapiSearchRepository } from '../../api/gapi/data/GapiSearchRepository';
import { GapiSearchRoute } from '../../api/gapi/data/GapiSearchRoute';
import { GapiSearchService } from '../../api/gapi/data/GapiSearchService';
import { GapiMetaSearchController } from '../../api/gapi/gapiMeta/GapiMetaSearchController';
import { GapiMetaSearchRepository } from '../../api/gapi/gapiMeta/GapiMetaSearchRepository';
import { GapiMetaSearchRoute } from '../../api/gapi/gapiMeta/GapiMetaSearchRoute';
import { GapiMetaSearchService } from '../../api/gapi/gapiMeta/GapiMetaSearchService';
import { HeartbeatsController } from '../../api/heartbeats/HeartbeatsController';
import { HeartbeatsRepository } from '../../api/heartbeats/HeartbeatsRepository';
import { HeartbeatsRoute } from '../../api/heartbeats/HeartbeatsRoute';
import { HeartbeatsService } from '../../api/heartbeats/HeartbeatsService';
import { InfoController } from '../../api/info/InfoController';
import { InfoRepository } from '../../api/info/InfoRepository';
import { InfoRoute } from '../../api/info/InfoRoute';
import { InfoService } from '../../api/info/InfoService';
import { EnobotCustomerStrategyController } from '../../api/mule/enobotCustomerStrategy/EnobotCustomerStrategyController';
import { EnobotCustomerStrategyRepository } from '../../api/mule/enobotCustomerStrategy/EnobotCustomerStrategyRepository';
import { EnobotCustomerStrategyRoute } from '../../api/mule/enobotCustomerStrategy/EnobotCustomerStrategyRoute';
import { EnobotCustomerStrategyService } from '../../api/mule/enobotCustomerStrategy/EnobotCustomerStrategyService';
import { EnobotNonFirmRequestController } from '../../api/mule/enobotNonFirmRequest/EnobotNonFirmRequestController';
import { EnobotNonFirmRequestRepository } from '../../api/mule/enobotNonFirmRequest/EnobotNonFirmRequestRepository';
import { EnobotNonFirmRequestRoute } from '../../api/mule/enobotNonFirmRequest/EnobotNonFirmRequestRoute';
import { EnobotNonFirmRequestService } from '../../api/mule/enobotNonFirmRequest/EnobotNonFirmRequestService';
import { EnobotStrategyController } from '../../api/mule/enobotStrategy/EnobotStrategyController';
import { EnobotStrategyRepository } from '../../api/mule/enobotStrategy/EnobotStrategyRepository';
import { EnobotStrategyRoute } from '../../api/mule/enobotStrategy/EnobotStrategyRoute';
import { EnobotStrategyService } from '../../api/mule/enobotStrategy/EnobotStrategyService';
import { EpexAvgController } from '../../api/mule/epexAvg/EpexAvgController';
import { EpexAvgRepository } from '../../api/mule/epexAvg/EpexAvgRepository';
import { EpexAvgRoute } from '../../api/mule/epexAvg/EpexAvgRoute';
import { EpexAvgService } from '../../api/mule/epexAvg/EpexAvgService';
import { EpexMetaController } from '../../api/mule/epexMeta/EpexMetaController';
import { EpexMetaRepository } from '../../api/mule/epexMeta/EpexMetaRepository';
import { EpexMetaRoute } from '../../api/mule/epexMeta/EpexMetaRoute';
import { EpexMetaService } from '../../api/mule/epexMeta/EpexMetaService';
import { EpexObContractController } from '../../api/mule/epexObContract/EpexObContractController';
import { EpexObContractRepository } from '../../api/mule/epexObContract/EpexObContractRepository';
import { EpexObContractRoute } from '../../api/mule/epexObContract/EpexObContractRoute';
import { EpexObContractService } from '../../api/mule/epexObContract/EpexObContractService';
import { EpexPublicTradeContractController } from '../../api/mule/epexPublicTradeContract/EpexPublicTradeContractController';
import { EpexPublicTradeContractRepository } from '../../api/mule/epexPublicTradeContract/EpexPublicTradeContractRepository';
import { EpexPublicTradeContractRoute } from '../../api/mule/epexPublicTradeContract/EpexPublicTradeContractRoute';
import { EpexPublicTradeContractService } from '../../api/mule/epexPublicTradeContract/EpexPublicTradeContractService';
import { SettingsController } from '../../api/settings/SettingsController';
import { SettingsRepository } from '../../api/settings/SettingsRepository';
import { SettingsRoute } from '../../api/settings/SettingsRoute';
import { SettingsService } from '../../api/settings/SettingsService';
import { EnobotRequestController } from '../../api/statkraft/enobotRequest/EnobotRequestController';
import { EnobotRequestRepository } from '../../api/statkraft/enobotRequest/EnobotRequestRepository';
import { EnobotRequestRoute } from '../../api/statkraft/enobotRequest/EnobotRequestRoute';
import { EnobotRequestService } from '../../api/statkraft/enobotRequest/EnobotRequestService';
import { Config } from '../../config/Config';

export class Routes {
  private app: Application;

  private apiVersion: string;
  private baseUrl: string;
  private routes: Route[] = [];

  private accountRepository: AccountRepository;
  private accountService: AccountService;
  private accountController: AccountController;
  private accountRoute: AccountRoute;

  private accountChartWidgetRepository: AccountChartWidgetRepository;
  private accountChartWidgetService: AccountChartWidgetService;
  private accountChartWidgetController: AccountChartWidgetController;
  private accountChartWidgetRoute: AccountChartWidgetRoute;

  private chartWidgetRepository: ChartWidgetRepository;
  private chartWidgetService: ChartWidgetService;
  private chartWidgetController: ChartWidgetController;
  private chartWidgetRoute: ChartWidgetRoute;

  private gapiMetaSearchRepository: GapiMetaSearchRepository;
  private gapiMetaSearchService: GapiMetaSearchService;
  private gapiMetaSearchController: GapiMetaSearchController;
  private gapiMetaSearchRoute: GapiMetaSearchRoute;

  private gapiSearchRepository: GapiSearchRepository;
  private gapiSearchService: GapiSearchService;
  private gapiSearchController: GapiSearchController;
  private gapiSearchRoute: GapiSearchRoute;

  private infoRepository: InfoRepository;
  private infoService: InfoService;
  private infoController: InfoController;
  private infoRoute: InfoRoute;

  private settingsRepository: SettingsRepository;
  private settingsService: SettingsService;
  private settingsController: SettingsController;
  private settingsRoute: SettingsRoute;

  private enobotRequestRepository: EnobotRequestRepository;
  private enobotRequestService: EnobotRequestService;
  private enobotRequestController: EnobotRequestController;
  private enobotRequestRoute: EnobotRequestRoute;

  private ampqEnobotOrderRepository: AmpqEnobotOrderRepository;
  private ampqEnobotOrderService: AmpqEnobotOrderService;
  private ampqEnobotOrderController: AmpqEnobotOrderController;
  private ampqEnobotOrderRoute: AmpqEnobotOrderRoute;

  private ampqEnobotStrategyRepository: AmpqEnobotStrategyRepository;
  private ampqEnobotStrategyService: AmpqEnobotStrategyService;
  private ampqEnobotStrategyController: AmpqEnobotStrategyController;
  private ampqEnobotStrategyRoute: AmpqEnobotStrategyRoute;

  private ampqEnobotCustomerStrategyRepository: AmpqEnobotCustomerStrategyRepository;
  private ampqEnobotCustomerStrategyService: AmpqEnobotCustomerStrategyService;
  private ampqEnobotCustomerStrategyController: AmpqEnobotCustomerStrategyController;
  private ampqEnobotCustomerStrategyRoute: AmpqEnobotCustomerStrategyRoute;

  private cmdExchangeLogRepository: CmdExchangeLogRepository;
  private cmdExchangeLogService: CmdExchangeLogService;
  private cmdExchangeLogController: CmdExchangeLogController;
  private cmdExchangeLogRoute: CmdExchangeLogRoute;

  private heartbeatsRepository: HeartbeatsRepository;
  private heartbeatsService: HeartbeatsService;
  private heartbeatsController: HeartbeatsController;
  private heartbeatsRoute: HeartbeatsRoute;

  private enobotStrategyRepository: EnobotStrategyRepository;
  private enobotStrategyService: EnobotStrategyService;
  private enobotStrategyController: EnobotStrategyController;
  private enobotStrategyRoute: EnobotStrategyRoute;

  private enobotCustomerStrategyRepository: EnobotCustomerStrategyRepository;
  private enobotCustomerStrategyService: EnobotCustomerStrategyService;
  private enobotCustomerStrategyController: EnobotCustomerStrategyController;
  private enobotCustomerStrategyRoute: EnobotCustomerStrategyRoute;

  private enobotNonFirmRequestRepository: EnobotNonFirmRequestRepository;
  private enobotNonFirmRequestService: EnobotNonFirmRequestService;
  private enobotNonFirmRequestController: EnobotNonFirmRequestController;
  private enobotNonFirmRequestRoute: EnobotNonFirmRequestRoute;

  private epexMetaRepository: EpexMetaRepository;
  private epexMetaService: EpexMetaService;
  private epexMetaController: EpexMetaController;
  private epexMetaRoute: EpexMetaRoute;

  private epexAvgRepository: EpexAvgRepository;
  private epexAvgService: EpexAvgService;
  private epexAvgController: EpexAvgController;
  private epexAvgRoute: EpexAvgRoute;

  private epexObContractRepository: EpexObContractRepository;
  private epexObContractService: EpexObContractService;
  private epexObContractController: EpexObContractController;
  private epexObContractRoute: EpexObContractRoute;

  private epexPublicTradeContractRepository: EpexPublicTradeContractRepository;
  private epexPublicTradeContractService: EpexPublicTradeContractService;
  private epexPublicTradeContractController: EpexPublicTradeContractController;
  private epexPublicTradeContractRoute: EpexPublicTradeContractRoute;

  constructor(app: Application) {
    this.app = app;
    this.apiVersion = Config.get('AppConfig').API_VERSION;
    this.baseUrl = `/${this.apiVersion}/api`;

    // TODO: should it be here?
    const psqlPool = PsqlPool();

    this.accountRepository = new AccountRepository(psqlPool);
    this.accountService = new AccountService(this.accountRepository);
    this.accountController = new AccountController(this.accountService);

    this.accountChartWidgetRepository = new AccountChartWidgetRepository(psqlPool);
    this.accountChartWidgetService = new AccountChartWidgetService(
      this.accountChartWidgetRepository,
    );
    this.accountChartWidgetController = new AccountChartWidgetController(
      this.accountChartWidgetService,
    );
    this.accountChartWidgetRoute = new AccountChartWidgetRoute(this.accountChartWidgetController);
    this.register(this.accountChartWidgetRoute);

    this.chartWidgetRepository = new ChartWidgetRepository(psqlPool);
    this.chartWidgetService = new ChartWidgetService(this.chartWidgetRepository);
    this.chartWidgetController = new ChartWidgetController(
      this.chartWidgetService,
      this.accountService,
      this.accountChartWidgetService,
    );
    this.chartWidgetRoute = new ChartWidgetRoute(this.chartWidgetController);
    this.register(this.chartWidgetRoute);

    this.accountRoute = new AccountRoute(this.accountController, this.chartWidgetController);
    this.register(this.accountRoute);

    this.gapiMetaSearchRepository = new GapiMetaSearchRepository();
    this.gapiMetaSearchService = new GapiMetaSearchService(this.gapiMetaSearchRepository);
    this.gapiMetaSearchController = new GapiMetaSearchController(this.gapiMetaSearchService);
    this.gapiMetaSearchRoute = new GapiMetaSearchRoute(this.gapiMetaSearchController);
    this.register(this.gapiMetaSearchRoute);

    this.gapiSearchRepository = new GapiSearchRepository();
    this.gapiSearchService = new GapiSearchService(this.gapiSearchRepository);
    this.gapiSearchController = new GapiSearchController(this.gapiSearchService);
    this.gapiSearchRoute = new GapiSearchRoute(this.gapiSearchController);
    this.register(this.gapiSearchRoute);

    this.infoRepository = new InfoRepository();
    this.infoService = new InfoService(this.infoRepository);
    this.infoController = new InfoController(this.infoService);
    this.infoRoute = new InfoRoute(this.infoController);
    this.register(this.infoRoute);

    this.settingsRepository = new SettingsRepository(psqlPool);
    this.settingsService = new SettingsService(this.settingsRepository);
    this.settingsController = new SettingsController(this.settingsService);
    this.settingsRoute = new SettingsRoute(this.settingsController);
    this.register(this.settingsRoute);

    this.enobotRequestRepository = new EnobotRequestRepository();
    this.enobotRequestService = new EnobotRequestService(this.enobotRequestRepository);
    this.enobotRequestController = new EnobotRequestController(this.enobotRequestService);
    this.enobotRequestRoute = new EnobotRequestRoute(this.enobotRequestController);
    this.register(this.enobotRequestRoute);

    this.ampqEnobotOrderRepository = new AmpqEnobotOrderRepository();
    this.ampqEnobotOrderService = new AmpqEnobotOrderService(this.ampqEnobotOrderRepository);
    this.ampqEnobotOrderController = new AmpqEnobotOrderController(this.ampqEnobotOrderService);
    this.ampqEnobotOrderRoute = new AmpqEnobotOrderRoute(this.ampqEnobotOrderController);
    this.register(this.ampqEnobotOrderRoute);

    this.ampqEnobotStrategyRepository = new AmpqEnobotStrategyRepository();
    this.ampqEnobotStrategyService = new AmpqEnobotStrategyService(
      this.ampqEnobotStrategyRepository,
    );
    this.ampqEnobotStrategyController = new AmpqEnobotStrategyController(
      this.ampqEnobotStrategyService,
    );
    this.ampqEnobotStrategyRoute = new AmpqEnobotStrategyRoute(this.ampqEnobotStrategyController);
    this.register(this.ampqEnobotStrategyRoute);

    this.ampqEnobotCustomerStrategyRepository = new AmpqEnobotCustomerStrategyRepository();
    this.ampqEnobotCustomerStrategyService = new AmpqEnobotCustomerStrategyService(
      this.ampqEnobotCustomerStrategyRepository,
    );
    this.ampqEnobotCustomerStrategyController = new AmpqEnobotCustomerStrategyController(
      this.ampqEnobotCustomerStrategyService,
    );
    this.ampqEnobotCustomerStrategyRoute = new AmpqEnobotCustomerStrategyRoute(
      this.ampqEnobotCustomerStrategyController,
    );
    this.register(this.ampqEnobotCustomerStrategyRoute);

    this.cmdExchangeLogRepository = new CmdExchangeLogRepository(psqlPool);
    this.cmdExchangeLogService = new CmdExchangeLogService(this.cmdExchangeLogRepository);
    this.cmdExchangeLogController = new CmdExchangeLogController(this.cmdExchangeLogService);
    this.cmdExchangeLogRoute = new CmdExchangeLogRoute(this.cmdExchangeLogController);
    this.register(this.cmdExchangeLogRoute);

    this.heartbeatsRepository = new HeartbeatsRepository();
    this.heartbeatsService = new HeartbeatsService(this.heartbeatsRepository);
    this.heartbeatsController = new HeartbeatsController(this.heartbeatsService);
    this.heartbeatsRoute = new HeartbeatsRoute(this.heartbeatsController);
    this.register(this.heartbeatsRoute);

    this.enobotStrategyRepository = new EnobotStrategyRepository();
    this.enobotStrategyService = new EnobotStrategyService(this.enobotStrategyRepository);
    this.enobotStrategyController = new EnobotStrategyController(this.enobotStrategyService);
    this.enobotStrategyRoute = new EnobotStrategyRoute(this.enobotStrategyController);
    this.register(this.enobotStrategyRoute);

    this.enobotCustomerStrategyRepository = new EnobotCustomerStrategyRepository();
    this.enobotCustomerStrategyService = new EnobotCustomerStrategyService(
      this.enobotCustomerStrategyRepository,
    );
    this.enobotCustomerStrategyController = new EnobotCustomerStrategyController(
      this.enobotCustomerStrategyService,
    );
    this.enobotCustomerStrategyRoute = new EnobotCustomerStrategyRoute(
      this.enobotCustomerStrategyController,
    );
    this.register(this.enobotCustomerStrategyRoute);

    this.enobotNonFirmRequestRepository = new EnobotNonFirmRequestRepository();
    this.enobotNonFirmRequestService = new EnobotNonFirmRequestService(
      this.enobotNonFirmRequestRepository,
    );
    this.enobotNonFirmRequestController = new EnobotNonFirmRequestController(
      this.enobotNonFirmRequestService,
    );
    this.enobotNonFirmRequestRoute = new EnobotNonFirmRequestRoute(
      this.enobotNonFirmRequestController,
    );
    this.register(this.enobotNonFirmRequestRoute);

    this.epexMetaRepository = new EpexMetaRepository();
    this.epexMetaService = new EpexMetaService(this.epexMetaRepository);
    this.epexMetaController = new EpexMetaController(this.epexMetaService);
    this.epexMetaRoute = new EpexMetaRoute(this.epexMetaController);
    this.register(this.epexMetaRoute);

    this.epexAvgRepository = new EpexAvgRepository();
    this.epexAvgService = new EpexAvgService(this.epexAvgRepository);
    this.epexAvgController = new EpexAvgController(this.epexAvgService);
    this.epexAvgRoute = new EpexAvgRoute(this.epexAvgController);
    this.register(this.epexAvgRoute);

    this.epexObContractRepository = new EpexObContractRepository();
    this.epexObContractService = new EpexObContractService(this.epexObContractRepository);
    this.epexObContractController = new EpexObContractController(this.epexObContractService);
    this.epexObContractRoute = new EpexObContractRoute(this.epexObContractController);
    this.register(this.epexObContractRoute);

    this.epexPublicTradeContractRepository = new EpexPublicTradeContractRepository();
    this.epexPublicTradeContractService = new EpexPublicTradeContractService(
      this.epexPublicTradeContractRepository,
    );
    this.epexPublicTradeContractController = new EpexPublicTradeContractController(
      this.epexPublicTradeContractService,
    );
    this.epexPublicTradeContractRoute = new EpexPublicTradeContractRoute(
      this.epexPublicTradeContractController,
    );
    this.register(this.epexPublicTradeContractRoute);
  }

  private register(route: Route): void {
    this.routes.push(route);
  }

  connect(): void {
    this.routes.forEach((route) => this.app.use(`${this.baseUrl}`, route.registerRoutes()));
    this.registerStatusRoute();
    this.registerProductionClientRoute();
    this.app.use(RootRoute.registerRoutes());
    this.app.use(UndefinedRoute);
  }

  registerStatusRoute = (): void => {
    this.app.get('/status', (req: Request, res: Response) => {
      res.contentType('text/html').end('active');
    });
  };

  registerProductionClientRoute = (): void => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const clientBuildPath = process.env.CLIENT_BUILD_PATH || '/';
    this.app.use(StaticFolderRegister(`${clientBuildPath}`));

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(path.resolve(), clientBuildPath, 'index.html'));
    });
  };
}
