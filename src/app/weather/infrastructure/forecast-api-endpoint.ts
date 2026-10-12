import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {CurrentWeatherResponse} from './current-weather-response';
import {CurrentWeatherAssembler} from './current-weather-assembler';
import {environment} from '../../../environments/environment';

const forecastEndpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;

/**
 * Endpoint of the Open-Meteo forecast resource.
 *
 * @author Kirk Douglas Quiliano Motta
 */
export class ForecastApiEndpoint {
  private assembler = new CurrentWeatherAssembler();

  constructor(private http: HttpClient) {
  }

  /** Gets the current temperature at the given coordinates. */
  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    const params = {latitude, longitude, current: environment.weatherProviderCurrentVariables};
    return this.http.get<CurrentWeatherResponse>(forecastEndpointUrl, {params}).pipe(
      map(response => {
        if (typeof response.current?.temperature_2m !== 'number') throw new Error('errors.weather-unavailable');
        return this.assembler.toEntityFromResponse(response);
      }),
      catchError(() => throwError(() => new Error('errors.weather-unavailable'))));
  }
}
