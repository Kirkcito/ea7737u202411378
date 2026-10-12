import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {ReservationResource, ReservationsResponse} from './reservations-response';


export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  toEntityFromResource(resource: ReservationResource): Reservation {
    return new Reservation({
      id: resource.id,
      sportsCenterId: resource.sportsCenterId,
      activityType: resource.activityType as ActivityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt)
    });
  }

  toResourceFromEntity(entity: Reservation): ReservationResource {
    return {
      id: entity.id,
      sportsCenterId: entity.sportsCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt.toISOString()
    };
  }

  toEntitiesFromResponse(response: ReservationsResponse): Reservation[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }
}
