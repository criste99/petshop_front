import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/Services/rest.service';
import { MascotaFormComponent } from '../forms/mascota-form/mascota-form.component';
import Swal from 'sweetalert2';
import { ModalServiceService } from 'src/app/Services/modal-service.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit{
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public api: RestService,public dialog: MatDialog, public modalService: ModalServiceService) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    // Realizar la llamada a la API y cargar los datos en la tabla
    this.api.Get("mascota").then((res) => {
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
    this.dialog.open(MascotaFormComponent, {
      width: '350px',
      height: '250px',
    });
   }
   eliminarItem(mascota: any) {
    console.log(mascota.id);
    Swal.fire({
      title: '¿Estás seguro que deseas remover la mascota?',
      text: 'La mascota no podrá ser recuperada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elíminalo!',
      cancelButtonText: 'No, olvídalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("mascota",mascota.id).then((res) => {
          if (res =! null) {
            Swal.fire(
              'Eliminado!',
              'Tu mascota ha sido eliminada.',
              'success'
            );
          }
        });
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Tu dueno sigue guardada',
          'error'
        );
      }
    });
  }

  editarItem(element: any){
    this.modalService.titulo = "Modificar Mascota";
    this.modalService.mascota = element
  this.modalService.accion.next("Actualizar");
  this.dialog.open(MascotaFormComponent, {
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

