import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../application/sports-centers.store';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {ACTIVITY_TYPES, ActivityType} from '../../../domain/model/activity-type';
import {Reservation} from '../../../domain/model/reservation.entity';
import {notBlankValidator} from '../../../../shared/presentation/validators/not-blank.validator';

/**
 * @author Kirk Douglas Quiliano Motta
 */
@Component({
  selector: 'app-reservation-create',
  imports: [ReactiveFormsModule, DecimalPipe, MatCard, MatCardContent, MatCardActions, MatFormField, MatLabel,
    MatHint, MatError, MatInput, MatSelect, MatOption, MatButton, MatProgressSpinner, TranslatePipe],
  templateUrl: './reservation-create.html',
  styleUrl: './reservation-create.css'
})
export class ReservationCreate implements OnInit {
  private router = inject(Router);
  protected sportsCentersStore = inject(SportsCentersStore);
  protected weatherStore = inject(WeatherStore);

  protected readonly activityTypes = ACTIVITY_TYPES;
  protected readonly form = inject(FormBuilder).nonNullable.group({
    activityType: ['', Validators.required],
    participantName: ['', [Validators.required, notBlankValidator]],
    participants: [1, [Validators.required, Validators.min(1)]]
  });
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly saving = signal(false);

  private readonly activityType = toSignal(this.form.controls.activityType.valueChanges, {initialValue: ''});
  private readonly participants = toSignal(this.form.controls.participants.valueChanges, {initialValue: 1});
  private readonly formStatus = toSignal(this.form.statusChanges, {initialValue: this.form.status});

  protected readonly sportsCenter = computed(() => this.activityType()
    ? this.sportsCentersStore.findSportsCenterByActivityType(this.activityType() as ActivityType)
    : undefined);
  protected readonly availableCapacity = computed(() =>
    this.sportsCenter()?.availableCapacity(this.sportsCentersStore.reservations()) ?? 0);
  protected readonly exceedsCapacity = computed(() =>
    !!this.sportsCenter() && !this.sportsCenter()!.canAccommodate(this.participants(), this.sportsCentersStore.reservations()));
  protected readonly canCreate = computed(() => this.formStatus() === 'VALID' && !!this.sportsCenter()
    && !this.exceedsCapacity() && !!this.weatherStore.currentWeather() && !this.saving());

  constructor() {
    this.form.controls.activityType.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.loadWeather());
  }

  ngOnInit(): void {
    this.sportsCentersStore.loadAll();
    this.weatherStore.clear();
  }

  /** Queries the current temperature of the selected sports center. */
  loadWeather(): void {
    this.errorMessage.set(null);
    const sportsCenter = this.sportsCenter();
    if (sportsCenter) this.weatherStore.loadCurrentWeather(sportsCenter.latitude, sportsCenter.longitude);
    else this.weatherStore.clear();
  }

  /** Saves the reservation and goes back to Home only when it was saved. */
  create(): void {
    const sportsCenter = this.sportsCenter();
    const currentWeather = this.weatherStore.currentWeather();
    if (!this.canCreate() || !sportsCenter || !currentWeather) return;
    const reservation = new Reservation({
      sportsCenterId: sportsCenter.id,
      activityType: sportsCenter.activityType,
      participantName: this.form.controls.participantName.value.trim(),
      participants: this.form.controls.participants.value,
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date()
    });
    this.saving.set(true);
    this.errorMessage.set(null);
    this.sportsCentersStore.createReservation(reservation).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.saving.set(false);
      }
    });
  }

  /** Goes back to Home without saving. */
  cancel(): void {
    this.router.navigate(['/home']);
  }
}
