import {Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {SportsCentersApiEndpoint} from './sports-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';


@Service()
export class SportsCentersApi extends BaseApi {
  private sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  /** Gets all the sports centers. */
  getSportsCenters(): Observable<SportsCenter[]> {
    return this.sportsCentersEndpoint.getAll();
  }

  /** Gets all the reservations. */
  getReservations(): Observable<Reservation[]> {
    return this.reservationsEndpoint.getAll();
  }

  /** Creates a reservation. */
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.reservationsEndpoint.create(reservation);
  }
}
