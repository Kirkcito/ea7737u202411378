/**
 * Current conditions resource returned by Open-Meteo.
 *
 * @author Kirk Douglas Quiliano Motta
 */
export interface CurrentWeatherResource {
  time: string;
  interval: number;
  temperature_2m: number;
}

/**
 * Response of the Open-Meteo forecast endpoint.
 *
 * @author Kirk Douglas Quiliano Motta
 */
export interface CurrentWeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeatherResource;
}
