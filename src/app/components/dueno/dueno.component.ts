import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
import { DuenoFormComponent } from '../forms/dueno-form/dueno-form.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/Services/modal-service';

@Component({
  selector: 'app-dueno',
  templateUrl: './dueno.component.html',
  styleUrls: ['./dueno.component.scss']
})
export class DuenoComponent implements OnInit{
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: RestService,public dialog: MatDialog, public modalService: ModalService) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    // Realizar la llamada a la API y cargar los datos en la tabla
    this.api.Get("dueno").then((res) => {
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
    this.dialog.open(DuenoFormComponent, {
      width: '350px',
      height: '500px',
    });
   }

   eliminarItem(dueno: any) {
    console.log(dueno.id);
    Swal.fire({
      title: '¿Estás seguro que deseas remover la dueño?',
      text: 'El dueño no podrá ser recuperado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elíminalo!',
      cancelButtonText: 'No, olvídalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("dueno",dueno.id).then((res) => {
          if (res =! null) {
            Swal.fire(
              'Eliminado!',
              'Tu dueno ha sido eliminado.',
              'success'
            );
          }
        });
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu dueno sigue guardado',
          'error'
        );
      }
    });
  }

  editarItem(row: any){
    this.modalService.titulo = "Modificar Dueno";
    this.modalService.dueno = row
    this.modalService.id = row.id;
  this.modalService.accion.next("Actualizar");
  this.dialog.open(DuenoFormComponent, {
    width: '350px',
    height: '200px',
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
