import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/Services/modal-service';
import { RestService } from 'src/app/Services/rest.service';
import { MascotaModels } from 'src/app/models/MascotaModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.scss']
})
export class MascotaFormComponent {
  private fb = inject(FormBuilder);
  titulo = "";
  accion = "";

  addressFormMascota = this.fb.group({
    nombre: ['', Validators.required],
    raza: ['', Validators.required],
    peso:[0, Validators.required],
    edad:[0, Validators.required],
  });

  infoMascota: MascotaModels = {
    nombre: "",
    raza: "",
    peso: 0,
    edad: 0,
  }

  infoMascota1 = {
    id: 0,
    nombre: "",
    raza: "",
    peso: 0,
    edad: 0,
  }

 hasUnitNumber = false;
  constructor(public api: RestService, public modalService: ModalService){}

  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    if (this.modalService.accion.value == 'Actualizar') {
      console.log(this.modalService.comida);
      
      this.addressFormMascota.controls['nombre'].setValue(
        this.modalService.mascota.nombre
      );
      this.addressFormMascota.controls['raza'].setValue(
        this.modalService.mascota.raza
      );
      this.addressFormMascota.controls['peso'].setValue(
        this.modalService.mascota.peso 
      );
      this.addressFormMascota.controls['edad'].setValue(
        this.modalService.mascota.edad 
      );
    }
  }
  async onSubmit(): Promise<void> {
    try {
      this.infoMascota.nombre = this.addressFormMascota.controls['nombre'].value;
      this.infoMascota.raza = this.addressFormMascota.controls['raza'].value;
      this.infoMascota.peso = this.addressFormMascota.controls['peso'].value;
      this.infoMascota.edad = this.addressFormMascota.controls['edad'].value;
      console.log(this.infoMascota);

      const res = await this.api.post("mascota", this.infoMascota);

      if(res){
        Swal.fire(
          'Perfecto!',
          'Su mascota ha sido registrada',
          'success'
        )
      }else{
        Swal.fire(
          'Perfecto!',
          'Su mascota ha sido registrada',
          'success'
        )
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
