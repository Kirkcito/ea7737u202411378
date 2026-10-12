import {BaseResource} from '../../shared/infrastructure/base-resource';


export interface SportsCenterResource extends BaseResource {
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}


export type SportsCentersResponse = SportsCenterResource[];
