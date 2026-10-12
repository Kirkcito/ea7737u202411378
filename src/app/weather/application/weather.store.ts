import {inject, Service, signal} from '@angular/core';
import {CurrentWeather} from '../domain/model/current-weather.entity';
import {WeatherApi} from '../infrastructure/weather-api';

/**
 * State of the current weather of the selected location.
 *
 * @author Kirk Douglas Quiliano Motta
 */
@Service()
export class WeatherStore {
  private weatherApi = inject(WeatherApi);
  private currentWeatherSignal = signal<CurrentWeather | null>(null);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  readonly currentWeather = this.currentWeatherSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Loads the current weather at the given coordinates. */
  loadCurrentWeather(latitude: number, longitude: number): void {
    this.currentWeatherSignal.set(null);
    this.errorSignal.set(null);
    this.loadingSignal.set(true);
    this.weatherApi.getCurrentWeather(latitude, longitude).subscribe({
      next: currentWeather => {
        this.currentWeatherSignal.set(currentWeather);
        this.loadingSignal.set(false);
      },
      error: (error: Error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      }
    });
  }

  /** Clears the current weather. */
  clear(): void {
    this.currentWeatherSignal.set(null);
    this.errorSignal.set(null);
    this.loadingSignal.set(false);
  }
}
