import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(public api: RestService){

  }
  addressFormMascota = this.fb.group({
    nombre: [null, Validators.required],
    raza: [null, Validators.required],
    peso:[null, Validators.required],
    edad:[null, Validators.required],
  });

  infoMascota: MascotaModels = {
    nombre: "",
    raza: "",
    peso: 0,
    edad: 0,
  }

  hasUnitNumber = false;


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
          'Su pieza ha sido registrada',
          'success'
        )
      }else{
        Swal.fire(
          'Perfecto!',
          'Su pieza ha sido registrada',
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
