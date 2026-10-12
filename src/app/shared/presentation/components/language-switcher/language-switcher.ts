import {Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);

  protected readonly languages = ['en', 'es'];
  protected readonly currentLanguage = this.translate.currentLang;

  /** Changes the active language. */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
