import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';
import { Productos } from 'src/app/services/bdv/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public Productos: Productos = {
    id: '',
    codigo: '',
    descripcion: ''
  }

  public _insert: string = ''
  public _search: string = 'none'

  public lstProductos = []


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
    this.Productos = e
    this._insert = ''
    this._search = 'none'
  }

  Guardar() {

    if (this.Productos.id == '') {
      //   this._snackBar.open('Debe verificar todos los campos...', 'OK')
      return
    }
    // this.ngxService.startLoader('load-inver')
    var obj = {
      "coleccion": "productos",
      "objeto": this.Productos,
      "donde": `{\"rif\":\"${this.Productos.id}\"}`,
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

    this.xAPI.funcion = "CAM_CProductos"
    this.xAPI.parametros = this.Productos.id

    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data != null && data.msj == undefined) {
          this.Productos = data[0]
        } else {
          let aux = this.Productos.id
          this.Limpiar()
          this.Productos.id = aux
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
    this.xAPI.funcion = "CAM_CLProductos"
    this.xAPI.parametros = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data != null && data.msj == undefined) this.lstProductos = data
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Limpiar() {
    this.Productos = {
      id: '',
      codigo: '',
      descripcion: ''
    }
  }

  ngOnInit(): void {
  }

}
