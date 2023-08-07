import { Injectable } from '@angular/core';

export interface Sistemas {
  id: string
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class SistemasService {

  constructor() { }
}
