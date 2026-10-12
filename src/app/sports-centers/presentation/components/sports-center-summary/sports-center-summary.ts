import {Component, computed, input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCenter} from '../../../domain/model/sports-center.entity';
import {Reservation} from '../../../domain/model/reservation.entity';


@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatList, MatListItem,
    MatListItemTitle, MatListItemLine, TranslatePipe],
  templateUrl: './sports-center-summary.html',
  styleUrl: './sports-center-summary.css'
})
export class SportsCenterSummary {
  sportsCenter = input.required<SportsCenter>();
  reservations = input.required<Reservation[]>();

  protected readonly centerReservations = computed(() => this.sportsCenter().reservationsFrom(this.reservations()));
  protected readonly totalParticipants = computed(() => this.sportsCenter().totalParticipants(this.reservations()));
  protected readonly availableCapacity = computed(() => this.sportsCenter().availableCapacity(this.reservations()));
}
