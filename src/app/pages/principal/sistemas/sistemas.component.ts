import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';
import { Sistemas } from 'src/app/services/bdv/sistemas/sistemas.service';

@Component({
  selector: 'app-sistemas',
  templateUrl: './sistemas.component.html',
  styleUrls: ['./sistemas.component.css']
})
export class SistemasComponent implements OnInit {

  public Sistemas: Sistemas = {
    id: '',
    nombre: ''
  }

  public _insert: string = ''
  public _search: string = 'none'

  public lstSistemas= []


  public xAPI: IAPICore = {
    funcion: '',
    parametros: ''
  }

  constructor(private apiService: ApiService,
    public dialog: MatDialog) { }

    atras(){
      this._insert = ''
      this._search = 'none'
    }
  
    editar(e) {
      this.Sistemas = e
      this._insert = ''
      this._search = 'none'
    }
  
    Guardar() {
  
      if (this.Sistemas.id == '') {
        //   this._snackBar.open('Debe verificar todos los campos...', 'OK')
        return
      }
      // this.ngxService.startLoader('load-inver')
      var obj = {
        "coleccion": "sistemas",
        "objeto": this.Sistemas,
        "donde": `{\"rif\":\"${this.Sistemas.id}\"}`,
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

      this.xAPI.funcion = "CAM_CSistemas"
      this.xAPI.parametros = this.Sistemas.id
  
      this.apiService.Ejecutar(this.xAPI).subscribe(
        (data) => {
          console.log(data)
          if (data != null && data.msj == undefined) {
            this.Sistemas = data[0]
          } else {
            let aux = this.Sistemas.id
            this.Limpiar()
            this.Sistemas.id = aux
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
      this.xAPI.funcion = "CAM_CLSistemas"
      this.xAPI.parametros = ''
      this.apiService.Ejecutar(this.xAPI).subscribe(
        (data) => {
          if (data != null && data.msj == undefined) this.lstSistemas= data
        },
        (error) => {
          console.log(error)
          this.Limpiar()
        }
      )
    }
  
    Limpiar() {
      this.Sistemas = {
        id: '',
        nombre: ''
      }
    }

  ngOnInit(): void {
  }

}
