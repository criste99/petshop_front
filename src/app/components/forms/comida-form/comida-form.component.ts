import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import { ComidaModels } from 'src/app/models/ComidaModel';
import { ModalService } from 'src/app/Services/modal-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comida-form',
  templateUrl: './comida-form.component.html',
  styleUrls: ['./comida-form.component.scss']
})


export class ComidaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  titulo = "";
  accion = "";

  addressFormComida = this.fb.group({
    marca: ['', Validators.required],
    descripcion: ['', Validators.required]

  });

  infoComida: ComidaModels = {
    marca: "",
    descripcion:""
  }

  infoComida1 = {
    id: 0,
    marca: "",
    descripcion:""
  }

  hasUnitNumber = false;
  constructor(public api: RestService, public modalService: ModalService){}

  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == 'Actualizar') {
      console.log(this.modalService.comida);
      
      this.addressFormComida.controls['marca'].setValue(
        this.modalService.comida.marca + ''
      );
      this.addressFormComida.controls['descripcion'].setValue(
        this.modalService.comida.descripcion + ''
      );
    }
  }

  

  async onSubmit(): Promise<void> {
    try {
      this.infoComida.marca = this.addressFormComida.controls['marca'].value;
      this.infoComida.descripcion = this.addressFormComida.controls['descripcion'].value;
      console.log(this.infoComida);

      if (this.modalService.accion.value == "Actualizar") {

        this.infoComida1.id = this.modalService.id;
        this.infoComida1.marca = this.infoComida.marca + '';
        this.infoComida1.descripcion = this.infoComida.descripcion + '';

        console.log(this.infoComida1.marca)
        console.log(this.infoComida1.id)
        const res = await this.api.put("comida", this.modalService.id + '', {marca: this.infoComida1.marca ,descripcion: this.infoComida1.descripcion });
        console.log(res)

        if (res) {
          const result = await Swal.fire({
            title: 'Perfecto!',
            text: 'Su pieza ha sido actualizada',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
        } else {
          Swal.fire(
            'Perfecto!',
            'Su pieza ha sido actualizada',
            'success'
          )
        }

      } else {
        const res = await this.api.post("comida", this.infoComida);

        if (res) {
          const result = await Swal.fire({
            title: 'Perfecto!',
            text: 'Su pieza ha sido registrada',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        if (result.isConfirmed) {
          window.location.reload();
        }
        } else {
          Swal.fire(
            'Perfecto!',
            'Su pieza ha sido registrada',
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
