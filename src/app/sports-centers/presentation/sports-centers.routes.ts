import {Routes} from '@angular/router';

/**
 * @author Kirk Douglas Quiliano Motta
 */
export const sportsCentersRoutes: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./views/reservation-create/reservation-create').then(m => m.ReservationCreate),
    title: 'UrbanFit - New Reservation'
  }
];
