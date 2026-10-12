import {ActivityType} from './activity-type';
import {Reservation} from './reservation.entity';


export class SportsCenter {
  id: number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;

  constructor(sportsCenter: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
  }) {
    this.id = sportsCenter.id;
    this.name = sportsCenter.name;
    this.activityType = sportsCenter.activityType;
    this.capacity = sportsCenter.capacity;
    this.latitude = sportsCenter.latitude;
    this.longitude = sportsCenter.longitude;
  }

  /** Returns the reservations that belong to this sports center. */
  reservationsFrom(reservations: Reservation[]): Reservation[] {
    return reservations.filter(reservation => reservation.sportsCenterId === this.id);
  }

  /** Returns the sum of participants of all the reservations of this sports center. */
  totalParticipants(reservations: Reservation[]): number {
    return this.reservationsFrom(reservations).reduce((total, reservation) => total + reservation.participants, 0);
  }

  /** Returns the capacity minus the registered participants. */
  availableCapacity(reservations: Reservation[]): number {
    return this.capacity - this.totalParticipants(reservations);
  }

  /** Checks that the participants are greater than zero and fit in the available capacity. */
  canAccommodate(participants: number, reservations: Reservation[]): boolean {
    return participants > 0 && participants <= this.availableCapacity(reservations);
  }
}
