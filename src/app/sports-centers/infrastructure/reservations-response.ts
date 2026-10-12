import {BaseResource} from '../../shared/infrastructure/base-resource';


export interface ReservationResource extends BaseResource {
  sportsCenterId: number;
  activityType: string;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export type ReservationsResponse = ReservationResource[];
