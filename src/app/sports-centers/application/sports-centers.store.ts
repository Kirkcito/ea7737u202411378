import {inject, Service, signal} from '@angular/core';
import {Observable, switchMap, tap, throwError} from 'rxjs';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {SportsCentersApi} from '../infrastructure/sports-centers-api';


@Service()
export class SportsCentersStore {
  private sportsCentersApi = inject(SportsCentersApi);
  private sportsCentersSignal = signal<SportsCenter[]>([]);
  private reservationsSignal = signal<Reservation[]>([]);
  private errorSignal = signal<string | null>(null);

  readonly sportsCenters = this.sportsCentersSignal.asReadonly();
  readonly reservations = this.reservationsSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Loads the sports centers and the reservations. */
  loadAll(): void {
    this.errorSignal.set(null);
    this.sportsCentersApi.getSportsCenters().subscribe({
      next: sportsCenters => this.sportsCentersSignal.set(sportsCenters),
      error: (error: Error) => this.errorSignal.set(error.message)
    });
    this.sportsCentersApi.getReservations().subscribe({
      next: reservations => this.reservationsSignal.set(reservations),
      error: (error: Error) => this.errorSignal.set(error.message)
    });
  }

  /** Finds the sports center that offers the given activity type. */
  findSportsCenterByActivityType(activityType: ActivityType): SportsCenter | undefined {
    return this.sportsCentersSignal().find(sportsCenter => sportsCenter.activityType === activityType);
  }

  /** Creates a reservation after reloading the reservations and checking the available capacity. */
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.sportsCentersApi.getReservations().pipe(
      switchMap(reservations => {
        this.reservationsSignal.set(reservations);
        const sportsCenter = this.sportsCentersSignal().find(center => center.id === reservation.sportsCenterId);
        if (!sportsCenter) return throwError(() => new Error('errors.sports-center-not-found'));
        if (!sportsCenter.canAccommodate(reservation.participants, reservations))
          return throwError(() => new Error('errors.capacity-exceeded'));
        return this.sportsCentersApi.createReservation(reservation);
      }),
      tap(created => this.reservationsSignal.update(reservations => [...reservations, created])));
  }
}
