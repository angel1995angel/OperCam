import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';
import { Modulos } from 'src/app/services/bdv/modulos/modulos.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  public Modulos: Modulos = {
    id: '',
    idSistemaRef: '',
    nombre: ''
  }

  public _insert: string = ''
  public _search: string = 'none'

  public lstModulos = []


  public xAPI: IAPICore = {
    funcion: '',
    parametros: ''
  }

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

  atras() {
    this._insert = ''
    this._search = 'none'
  }

  editar(e) {
    this.Modulos = e
    this._insert = ''
    this._search = 'none'
  }

  Guardar() {

    if (this.Modulos.id == '') {
      //   this._snackBar.open('Debe verificar todos los campos...', 'OK')
      return
    }
    // this.ngxService.startLoader('load-inver')
    var obj = {
      "coleccion": "modulos",
      "objeto": this.Modulos,
      "donde": `{\"rif\":\"${this.Modulos.id}\"}`,
      "driver": "MDBCAM",
      "upsert": true
    }
    this.apiService.ExecColeccion(obj).subscribe(
      (data) => {
        console.log(data)
        this.apiService.Mensaje('Proceso exitoso', 'Felicitaciones', 'success', 'inversion')
        //   this.ngxService.stopLoader('load-inver')
        this.Limpiar()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  Consultar() {

    this.xAPI.funcion = "CAM_CModulos"
    this.xAPI.parametros = this.Modulos.id

    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data != null && data.msj == undefined) {
          this.Modulos = data[0]
        } else {
          let aux = this.Modulos.id
          this.Limpiar()
          this.Modulos.id = aux
        }
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Seleccionar() {
    this.Listar()
    this._insert = 'none'
    this._search = ''
  }

  Listar() {
    this.xAPI.funcion = "CAM_CLModulos"
    this.xAPI.parametros = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data != null && data.msj == undefined) this.lstModulos = data
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Limpiar() {
    this.Modulos = {
      id: '',
      idSistemaRef: '',
      nombre: ''
    }
  }

  ngOnInit(): void {
  }

}
