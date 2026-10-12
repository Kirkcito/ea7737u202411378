import {Component} from '@angular/core';
import {Layout} from './shared/presentation/components/layout/layout';

/**
 * @author Kirk Douglas Quiliano Motta
 */
@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
