import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
import { ComidaFormComponent } from '../forms/comida-form/comida-form.component';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/Services/modal-service';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.scss']
})
export class ComidaComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: RestService,public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    // Realizar la llamada a la API y cargar los datos en la tabla
    this.api.Get("comida").then((res) => {
      if (Array.isArray(res.data)) { // Verificar si res.data es un arreglo
        this.loadTable(res.data); // Cargar las columnas desde los datos
        this.dataSource = new MatTableDataSource(res.data); // Configurar los datos en el MatTableDataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error("La propiedad 'data' de la respuesta de la API no es un arreglo:", res.data);
        // Puedes manejar el error o mostrar un mensaje al usuario aquí
      }
    });
  }
  loadTable(data: any[]) {
    // Extraer los nombres de las columnas de la primera fila de datos (si los datos son objetos)
    if (data.length > 0) {
      this.displayedColumns = Object.keys(data[0]);
      this.displayedColumns.push('Acciones');
    }
  }
  openDialog () {
    this.modalService.titulo = "Nueva Comida";
    this.modalService.accion.next("Crear Comida");
    this.dialog.open(ComidaFormComponent, {
      width: '350px',
      height: '300px',
    });
   }
   eliminarItem(comida: any) {
    console.log(comida.id);
    Swal.fire({
      title: '¿Estás seguro que deseas remover la comida?',
      text: 'La comida no podrá ser recuperada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elíminalo!',
      cancelButtonText: 'No, olvídalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("comida",comida.id).then((res) => {
          if (res =! null) {
            Swal.fire(
              'Eliminado!',
              'Tu comida ha sido eliminada.',
              'success'
            );
          }
        });
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu comida sigue guardada',
          'error'
        );
      }
    });
  }

  editarItem(row: any){
    this.modalService.titulo = "Modificar Comida";
    this.modalService.comida = row
    this.modalService.id = row.id;
  this.modalService.accion.next("Actualizar");
  this.dialog.open(ComidaFormComponent, {
    width: '350px',
    height: '300px',
  });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

