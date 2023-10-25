import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import { ComidaModels } from 'src/app/models/ComidaModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comida-form',
  templateUrl: './comida-form.component.html',
  styleUrls: ['./comida-form.component.scss']
})


export class ComidaFormComponent implements OnInit {
  constructor(public api: RestService){

  }
  ngOnInit(): void {
    this.api.Get("comida");
  }


  private fb = inject(FormBuilder);
  addressFormComida = this.fb.group({
    breed: [null, Validators.required],
    description: [null, Validators.required],
  });

  infoComida: ComidaModels = {
    marca: "",
    descripcion:""
  }

  hasUnitNumber = false;


  async onSubmit(): Promise<void> {
    try {
      this.infoComida.marca = this.addressFormComida.controls['breed'].value;
      this.infoComida.descripcion = this.addressFormComida.controls['description'].value;
      console.log(this.infoComida);

      const res = await this.api.post("comida", this.infoComida);

      if(res){
        Swal.fire(
          'Perfecto!',
          'Su comida ha sido registrada',
          'success'
        )
      }else{
        Swal.fire(
          'Perfecto!',
          'Su comida ha sido registrada',
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
