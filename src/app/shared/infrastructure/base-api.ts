import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';


export abstract class BaseApi {
  protected http = inject(HttpClient);
}
