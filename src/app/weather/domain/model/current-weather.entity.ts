/**
 * Current weather conditions at a geographic location.
 *
 * @author Kirk Douglas Quiliano Motta
 */
export class CurrentWeather {
  latitude: number;
  longitude: number;
  temperature: number;
  observedAt: Date;

  constructor(currentWeather: { latitude: number; longitude: number; temperature: number; observedAt: Date }) {
    this.latitude = currentWeather.latitude;
    this.longitude = currentWeather.longitude;
    this.temperature = currentWeather.temperature;
    this.observedAt = currentWeather.observedAt;
  }
}
