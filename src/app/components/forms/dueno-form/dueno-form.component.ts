import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
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
  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.api.Get("dueno");
  }
  addressFormDueno = this.fb.group({
    nombre: [null, Validators.required],
    tipo_id: [null, Validators.required],
    identificacion: [null, Validators.required],
    correo: [null, Validators.required],
    telefono: [null, Validators.required],
  });


  infoDueno: DuenoModels = {
    nombre: "",
    tipo_id: "",
    identificacion: "",
    correo: "",
    telefono: ""
  }

  hasUnitNumber = false;

  async onSubmit(): Promise<void> {
    try {
      this.infoDueno.nombre = this.addressFormDueno.controls['nombre'].value;
      this.infoDueno.tipo_id = this.addressFormDueno.controls['tipo_id'].value;
      this.infoDueno.identificacion = this.addressFormDueno.controls['identificacion'].value;
      this.infoDueno.correo = this.addressFormDueno.controls['correo'].value;
      this.infoDueno.telefono = this.addressFormDueno.controls['telefono'].value;

      console.log(this.infoDueno);

      const res = await this.api.post("dueno", this.infoDueno);

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
