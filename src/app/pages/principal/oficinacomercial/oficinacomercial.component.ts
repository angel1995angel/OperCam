import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';
import { Oficinacomercial } from 'src/app/services/bdv/oficinacomercial.service';

@Component({
  selector: 'app-oficinacomercial',
  templateUrl: './oficinacomercial.component.html',
  styleUrls: ['./oficinacomercial.component.css']
})
export class OficinacomercialComponent implements OnInit {

  public Oficinacomercial: Oficinacomercial = {
    codigo: '',
    nombre: '',
    direccion: '',
    estado: '',
    municipio: ''
  }

  public _insert: string = ''
  public _search: string = 'none'

  public lstOficinacomercial= []

  public xAPI: IAPICore = {
    funcion: '',
    parametros: ''
  }

  constructor( private apiService: ApiService,
    public dialog: MatDialog) { }


  atras(){
    this._insert = ''
    this._search = 'none'
  }

  editar(e) {
    this.Oficinacomercial = e
    this._insert = ''
    this._search = 'none'
  }

  Guardar() {

    if (this.Oficinacomercial.codigo == '') {
      //   this._snackBar.open('Debe verificar todos los campos...', 'OK')
      return
    }
    // this.ngxService.startLoader('load-inver')
    var obj = {
      "coleccion": "oficinacomercial",
      "objeto": this.Oficinacomercial,
      "donde": `{\"rif\":\"${this.Oficinacomercial.codigo}\"}`,
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

    this.xAPI.funcion = "CAM_COficinacomercial"
    this.xAPI.parametros = this.Oficinacomercial.codigo

    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data != null && data.msj == undefined) {
          this.Oficinacomercial = data[0]
        } else {
          let aux = this.Oficinacomercial.codigo
          this.Limpiar()
          this.Oficinacomercial.codigo = aux
        }
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Seleccionar(){
    this.Listar()
    this._insert = 'none'
    this._search = ''
  }

  Listar() {
    this.xAPI.funcion = "CAM_CLOficinacomercial"
    this.xAPI.parametros = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data != null && data.msj == undefined) this.lstOficinacomercial = data
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Limpiar() {
    this.Oficinacomercial = {
      codigo: '',
      nombre: '',
      direccion: '',
      estado: '',
      municipio: ''
    }
  }

  ngOnInit(): void {
  }

}
