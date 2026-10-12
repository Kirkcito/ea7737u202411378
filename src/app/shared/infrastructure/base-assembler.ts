import {BaseResource} from './base-resource';


export interface BaseAssembler<TEntity, TResource extends BaseResource, TResponse> {
  /** Maps a resource to an entity. */
  toEntityFromResource(resource: TResource): TEntity;

  /** Maps an entity to a resource. */
  toResourceFromEntity(entity: TEntity): TResource;

  /** Maps a response to a list of entities. */
  toEntitiesFromResponse(response: TResponse): TEntity[];
}
