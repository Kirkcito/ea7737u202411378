import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Reservation} from '../domain/model/reservation.entity';
import {ReservationResource, ReservationsResponse} from './reservations-response';
import {ReservationAssembler} from './reservation-assembler';
import {environment} from '../../../environments/environment';

const reservationsEndpointUrl =
  `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`;


export class ReservationsApiEndpoint
  extends BaseApiEndpoint<Reservation, ReservationResource, ReservationsResponse, ReservationAssembler> {
  constructor(http: HttpClient) {
    super(http, reservationsEndpointUrl, new ReservationAssembler());
  }
}
