import {CurrentWeather} from '../domain/model/current-weather.entity';
import {CurrentWeatherResponse} from './current-weather-response';

/**
 * Maps Open-Meteo responses to CurrentWeather entities.
 *
 * @author Kirk Douglas Quiliano Motta
 */
export class CurrentWeatherAssembler {
  /** Maps a forecast response to a CurrentWeather entity. */
  toEntityFromResponse(response: CurrentWeatherResponse): CurrentWeather {
    return new CurrentWeather({
      latitude: response.latitude,
      longitude: response.longitude,
      temperature: response.current.temperature_2m,
      observedAt: new Date(response.current.time)
    });
  }
}
