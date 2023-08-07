import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface Empresa {
  rif: string
  nombre: string
  siglas: string
  emisor: string
  depositario: string
  estatus: string
  cuenta: string
}


//public lstEmpresas = []

@Injectable({
  providedIn: 'root'
})


export class EmpresaService {

  constructor() { }
}
