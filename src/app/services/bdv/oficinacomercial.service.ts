import { Injectable } from '@angular/core';

export interface Oficinacomercial{
  codigo: string
  nombre: string
  direccion: string
  estado: string
  municipio: string
}

@Injectable({
  providedIn: 'root'
})
export class OficinacomercialService {

  constructor() { }
}
