import { PageResult, Paginator } from '@visionworksco/expressjs-middleware';
import { HttpError } from 'http-errors';
import { EnobotTimeSerieEntity } from '../../../type/EnobotTimeSerieEntity';
import { GapiSearchType } from './GapiSearchType';

export class GapiSearchPageResult extends PageResult<EnobotTimeSerieEntity> {
  readonly type: GapiSearchType | null;

  constructor(
    type: GapiSearchType | null,
    data: EnobotTimeSerieEntity[],
    paginator: Paginator,
    error?: HttpError,
  ) {
    super(data, paginator, error);
    this.type = type;
  }
}
