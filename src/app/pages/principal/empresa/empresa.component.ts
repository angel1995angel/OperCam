import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/services/bdv/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public Empresa: Empresa = {
    rif: '',
    nombre: '',
    siglas: '',
    emisor: '',
    depositario: '',
    estatus: '',
    cuenta: ''
  }

  public _insert: string = ''
  public _search: string = 'none'

  public lstEmpresas= []

  public xAPI: IAPICore = {
    funcion: '',
    parametros: ''
  }

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    // private _snackBar: MatSnackBar,
    //private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }

  atras(){
    this._insert = ''
    this._search = 'none'
  }

  editar(e) {
    this.Empresa = e
    this._insert = ''
    this._search = 'none'
  }

  Guardar() {

    if (this.Empresa.rif == "") {
      //   this._snackBar.open('Debe verificar todos los campos...', 'OK')
      return
    }
    // this.ngxService.startLoader('load-inver')
    var obj = {
      "coleccion": "empresa",
      "objeto": this.Empresa,
      "donde": `{\"rif\":\"${this.Empresa.rif}\"}`,
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

    this.xAPI.funcion = "CAM_CEmpresas"
    this.xAPI.parametros = this.Empresa.rif

    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data != null && data.msj == undefined) {
          this.Empresa = data[0]
        } else {
          let aux = this.Empresa.rif
          this.Limpiar()
          this.Empresa.rif = aux
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
    this.xAPI.funcion = "CAM_CLEmpresas"
    this.xAPI.parametros = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data != null && data.msj == undefined) this.lstEmpresas = data
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Limpiar() {
    this.Empresa = {
      rif: '',
      nombre: '',
      siglas: '',
      emisor: '',
      depositario: '',
      estatus: '',
      cuenta: ''
    }
  }

}
