import {Component, inject, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {SportsCentersStore} from '../../../../sports-centers/application/sports-centers.store';
import {SportsCenterSummaryList} from '../../../../sports-centers/presentation/components/sports-center-summary-list/sports-center-summary-list';


@Component({
  selector: 'app-home',
  imports: [TranslatePipe, SportsCenterSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  protected store = inject(SportsCentersStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
