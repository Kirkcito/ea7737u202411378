import {ActivityType} from './activity-type';


export class Reservation {
  id: number;
  sportsCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: Date;

  constructor(reservation: {
    id?: number;
    sportsCenterId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.id = reservation.id ?? 0;
    this.sportsCenterId = reservation.sportsCenterId;
    this.activityType = reservation.activityType;
    this.participantName = reservation.participantName;
    this.participants = reservation.participants;
    this.weatherTemperature = reservation.weatherTemperature;
    this.reservedAt = reservation.reservedAt;
  }
}
