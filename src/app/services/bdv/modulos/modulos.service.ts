import { Injectable } from '@angular/core';

export interface Modulos {
  id: string
  idSistemaRef: string
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class ModulosService {

  constructor() { }
}
