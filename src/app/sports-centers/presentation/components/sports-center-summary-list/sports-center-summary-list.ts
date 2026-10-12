import {Component, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {SportsCenter} from '../../../domain/model/sports-center.entity';
import {Reservation} from '../../../domain/model/reservation.entity';
import {SportsCenterSummary} from '../sports-center-summary/sports-center-summary';


@Component({
  selector: 'app-sports-center-summary-list',
  imports: [MatGridList, MatGridTile, SportsCenterSummary],
  templateUrl: './sports-center-summary-list.html',
  styleUrl: './sports-center-summary-list.css'
})
export class SportsCenterSummaryList {
  sportsCenters = input.required<SportsCenter[]>();
  reservations = input.required<Reservation[]>();

  protected readonly columns = toSignal(
    inject(BreakpointObserver).observe(Breakpoints.XSmall).pipe(map(state => state.matches ? 1 : 2)),
    {initialValue: 2});
}
