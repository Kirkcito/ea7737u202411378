import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {SportsCenterResource, SportsCentersResponse} from './sports-centers-response';
import {SportsCenterAssembler} from './sports-center-assembler';
import {environment} from '../../../environments/environment';

const sportsCentersEndpointUrl =
  `${environment.platformProviderApiBaseUrl}${environment.platformProviderSportsCentersEndpointPath}`;


export class SportsCentersApiEndpoint
  extends BaseApiEndpoint<SportsCenter, SportsCenterResource, SportsCentersResponse, SportsCenterAssembler> {
  constructor(http: HttpClient) {
    super(http, sportsCentersEndpointUrl, new SportsCenterAssembler());
  }
}
