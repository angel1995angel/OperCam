import { Injectable } from '@angular/core';

export interface Productos {
  id: string
  codigo: string
  descripcion: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
}
