import {Routes} from '@angular/router';
import {Home} from './shared/presentation/views/home/home';
import {PageNotFound} from './shared/presentation/views/page-not-found/page-not-found';

/**
 * @author Kirk Douglas Quiliano Motta
 */
export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: Home, title: 'UrbanFit - Home'},
  {
    path: 'reservations',
    loadChildren: () => import('./sports-centers/presentation/sports-centers.routes').then(m => m.sportsCentersRoutes)
  },
  {path: '**', component: PageNotFound, title: 'UrbanFit - Page Not Found'}
];
