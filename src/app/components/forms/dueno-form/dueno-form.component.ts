import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/Services/modal-service';
import { RestService } from 'src/app/Services/rest.service';
import { DuenoModels } from 'src/app/models/DuenoModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dueno-form',
  templateUrl: './dueno-form.component.html',
  styleUrls: ['./dueno-form.component.scss']
})
export class DuenoFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  titulo = "";
  accion = "";

  addressFormDueno = this.fb.group({
    nombre: ['', Validators.required],
    tipo_id: ['', Validators.required],
    identificacion: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
  });
  infoDueno: DuenoModels = {
    nombre: "",
    tipo_id: "",
    identificacion: "",
    correo: "",
    telefono: ""
  }
  infoDueno1 = {
    id: 0,
    nombre: "",
    tipo_id: "",
    identificacion: "",
    correo: "",
    telefono: ""
  }

  hasUnitNumber = false;


  constructor(public api: RestService, public modalService: ModalService){

  }
  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == 'Actualizar') {
      console.log(this.modalService.dueno);
      
      this.addressFormDueno.controls['nombre'].setValue(
        this.modalService.dueno.nombre + ''
      );
      this.addressFormDueno.controls['tipo_id'].setValue(
        this.modalService.dueno.tipo_id + ''
      );
      this.addressFormDueno.controls['identificacion'].setValue(
        this.modalService.dueno.identificacion + ''
      );
      this.addressFormDueno.controls['correo'].setValue(
        this.modalService.dueno.correo + ''
      );
      this.addressFormDueno.controls['telefono'].setValue(
        this.modalService.dueno.telefono + ''
      );
    }
  }
 


  
  async onSubmit(): Promise<void> {
    try {
      this.infoDueno.nombre = this.addressFormDueno.controls['nombre'].value;
      this.infoDueno.tipo_id = this.addressFormDueno.controls['tipo_id'].value;
      this.infoDueno.identificacion = this.addressFormDueno.controls['identificacion'].value;
      this.infoDueno.correo = this.addressFormDueno.controls['correo'].value;
      this.infoDueno.telefono = this.addressFormDueno.controls['telefono'].value;

      console.log(this.infoDueno);

      if (this.modalService.accion.value == "Actualizar") {

        this.infoDueno1.id = this.modalService.id;
        this.infoDueno1.nombre = this.infoDueno.nombre + '';
        this.infoDueno1.tipo_id = this.infoDueno.tipo_id + '';
        this.infoDueno1.identificacion = this.infoDueno.identificacion + '';
        this.infoDueno1.correo = this.infoDueno.correo + '';
        this.infoDueno1.telefono = this.infoDueno.telefono + '';

        console.log(this.infoDueno1.nombre)
        console.log(this.infoDueno1.id)
        const res = await this.api.put("dueno", this.modalService.id + '', {name: this.infoDueno1.nombre});
        console.log(res)

        if (res) {
          const result = await Swal.fire({
            title: 'Perfecto!',
            text: 'Su dueño ha sido actualizado',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
        } else {
          Swal.fire(
            'Perfecto!',
            'Su dueño ha sido actualizado',
            'success'
          )
        }

      } else {
        const res = await this.api.post("dueno", this.infoDueno);

        if (res) {
          const result = await Swal.fire({
            title: 'Perfecto!',
            text: 'Su dueño ha sido registrado',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
        } else {
          Swal.fire(
            'Perfecto!',
            'Su dueño ha sido registrado',
            'success'
          )
        }
      }

    } catch (e) {
      Swal.fire(
        'Error!',
        'Por favor intente de nuevo',
        'error'
      )
    }

  }
}
