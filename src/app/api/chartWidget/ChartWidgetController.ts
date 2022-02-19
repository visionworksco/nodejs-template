import {
  AuthUser,
  BaseRequest,
  BaseResult,
  Header,
  PageRequest,
  ServerException,
  StatusCode,
} from '@visionworksco/nodejs-middleware';
import { Response } from 'express';
import { BaseApiCrudController } from '../../controller/BaseApiCrudController';
import { ControllerUtils } from '../../controller/ControllerUtils';
import { AccountService } from '../account/AccountService';
import { AccountChartWidgetEntity } from '../accountChartWidget/AccountChartWidgetEntity';
import { AccountChartWidgetService } from '../accountChartWidget/AccountChartWidgetService';
import { ChartWidget } from './ChartWidget';
import { ChartWidgetEntity } from './ChartWidgetEntity';
import { ChartWidgetService } from './ChartWidgetService';
import { ChartWidgetUtils } from './ChartWidgetUtils';

export class ChartWidgetController extends BaseApiCrudController<ChartWidgetEntity> {
  private chartWidgetService: ChartWidgetService;
  private accountService: AccountService;
  private accountChartWidgetService: AccountChartWidgetService;

  constructor(
    service: ChartWidgetService,
    accountService: AccountService,
    accountChartWidgetService: AccountChartWidgetService,
  ) {
    super(service, ChartWidgetEntity);
    this.chartWidgetService = service;
    this.accountService = accountService;
    this.accountChartWidgetService = accountChartWidgetService;
  }

  async findAllByAccountEmail(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { email } = req.params;

      const accountId = await this.accountService.findIdByEmail(email);
      if (!accountId) {
        throw ServerException.NotFoundException();
      }

      this.preFindAll(req);

      const pageRequestOptions = await this.normalizePageRequestOptions(req.query);
      const { sort, page, pageLimit } = pageRequestOptions;
      const sortOptionUpdated = this.normalizeSortOption(sort);

      const query = await this.normalizeRequestQuery(req.query);

      const pageRequest = new PageRequest(query, sortOptionUpdated, page, pageLimit);

      const result = await this.chartWidgetService.findAllByAccountId(accountId, pageRequest);

      let status = StatusCode.OK;
      if (result.paginator.isPartialContent()) {
        status = StatusCode.PARTIAL_CONTENT;
        res.setHeader(Header.X_TOTAL_COUNT, result.paginator.collectionSize);
      }

      res.status(status).json(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async save(req: BaseRequest, res: Response): Promise<void> {
    try {
      const entity = (await this.normalizeRequestBody(req.body, false)) as ChartWidgetEntity;

      const entityUpdated = this.preSave(req, entity);
      const entitySaved = await this.service.save(entityUpdated);

      const { id } = entitySaved;

      // link created chart widget to a current user
      await this.linkToUser(entitySaved, req.user);

      res.setHeader(Header.LOCATION, `${req.originalUrl}/${id}`);
      const response = new BaseResult(entitySaved);
      res.status(StatusCode.CREATED).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateById(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await this.validateChartWidgetAccess(req, id);

      const entity = (await this.normalizeRequestBody(req.body, true)) as ChartWidgetEntity;

      let entityUpdated = this.preUpdate(req, entity);
      entityUpdated = await this.service.updateById(id, entityUpdated);

      const response = new BaseResult(entityUpdated);
      res.status(StatusCode.OK).json(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteById(req: BaseRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await this.validateChartWidgetAccess(req, id);

      // unlink a widget from all users
      await this.unlinkFromAllUsers(id);

      await this.service.deleteById(id);

      res.status(StatusCode.NO_CONTENT).send();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async validateChartWidgetAccess(req: BaseRequest, chartWidgetId: string) {
    try {
      // chart widget
      let chartWidget: ChartWidget | undefined = undefined;
      try {
        chartWidget = await this.service.findById(chartWidgetId);
      } catch (error) {
        chartWidget = undefined;
      }

      if (!chartWidget) {
        throw ServerException.NotFoundException();
      }

      // current user
      const userEmail = ControllerUtils.getUserEmail(req);

      // validate if a current user can delete a chart widget
      if (!ChartWidgetUtils.isOwner(chartWidget, userEmail)) {
        throw ServerException.InvalidAccessException();
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async linkToUser(chartWidget: ChartWidget, user?: AuthUser): Promise<void> {
    if (!user) {
      return;
    }

    const accountId = await this.accountService.findIdByEmail(user.email);
    if (!accountId) {
      return;
    }

    const accountChartWidgetEntity = new AccountChartWidgetEntity(
      Number(accountId),
      Number(chartWidget.id),
    );
    accountChartWidgetEntity.createdAt = chartWidget.createdAt;
    accountChartWidgetEntity.createdBy = chartWidget.createdBy;

    await this.accountChartWidgetService.save(accountChartWidgetEntity);
  }

  private async unlinkFromAllUsers(id: string): Promise<void> {
    await this.accountChartWidgetService.deleteByChartWidgetId(id);
  }
}
