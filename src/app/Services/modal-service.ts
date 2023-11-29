import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MascotaModels } from '../models/MascotaModel';
import { DuenoModels } from '../models/DuenoModel';
import { ComidaModels } from '../models/ComidaModel';

@Injectable({
    providedIn: 'root'
  })

  export class ModalService{
    id: number;
    mascota:MascotaModels;
    dueno:DuenoModels;
    comida:ComidaModels;

    titulo = "";
    accion = new BehaviorSubject("");
    constructor() { }
  }