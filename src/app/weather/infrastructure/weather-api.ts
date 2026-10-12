import {Service} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {ForecastApiEndpoint} from './forecast-api-endpoint';

/**
 * API facade of the Weather bounded context.
 *
 * @author Kirk Douglas Quiliano Motta
 */
@Service()
export class WeatherApi extends BaseApi {
  private forecastEndpoint = new ForecastApiEndpoint(this.http);

  /** Gets the current weather at the given coordinates. */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    return this.forecastEndpoint.getCurrentWeather(latitude, longitude);
  }
}
