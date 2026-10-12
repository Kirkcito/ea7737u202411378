import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbar, MatSidenavContainer, MatSidenav, MatSidenavContent,
    MatNavList, MatListItem, MatListItemIcon, MatIcon, MatIconButton, TranslatePipe, LanguageSwitcher],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  protected readonly isHandset = toSignal(
    inject(BreakpointObserver).observe(Breakpoints.XSmall).pipe(map(state => state.matches)),
    {initialValue: false});

  protected readonly options = [
    {path: '/home', label: 'navigation.home', icon: 'home'},
    {path: '/reservations/new', label: 'navigation.new-reservation', icon: 'event_available'}
  ];
}
