import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SportsCenter} from '../domain/model/sports-center.entity';
import {ActivityType} from '../domain/model/activity-type';
import {SportsCenterResource, SportsCentersResponse} from './sports-centers-response';


export class SportsCenterAssembler implements BaseAssembler<SportsCenter, SportsCenterResource, SportsCentersResponse> {
  toEntityFromResource(resource: SportsCenterResource): SportsCenter {
    return new SportsCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType as ActivityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });
  }

  toResourceFromEntity(entity: SportsCenter): SportsCenterResource {
    return {
      id: entity.id,
      name: entity.name,
      activityType: entity.activityType,
      capacity: entity.capacity,
      latitude: entity.latitude,
      longitude: entity.longitude
    };
  }

  toEntitiesFromResponse(response: SportsCentersResponse): SportsCenter[] {
    return response.map(resource => this.toEntityFromResource(resource));
  }
}
